from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import cv2 as cv
import module as m
import time
import threading

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Variables
flags = {'eyePosition': ''}
COUNTER = 0
TOTAL_BLINKS = 0
CLOSED_EYES_FRAME = 3
BLINK_THRESHOLD = 4
FRAME_COUNTER = 0
START_TIME = time.time()
FPS = 0
last_emit_time = 0  # Track last WebSocket emission time
CENTER_COUNTER = 0

# Capture thread
def capture_camera():
    global flags, COUNTER, TOTAL_BLINKS, FRAME_COUNTER, FPS, last_emit_time, CENTER_COUNTER
    camera = cv.VideoCapture(0)

    while True:
        FRAME_COUNTER += 1
        ret, frame = camera.read()
        if not ret:
            break

        grayFrame = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
        image, face = m.faceDetector(frame, grayFrame)
        if face is not None:
            image, PointList = m.faceLandmakDetector(frame, grayFrame, face, False)
            RightEyePoint = PointList[36:42]
            LeftEyePoint = PointList[42:48]
            leftRatio, _, _ = m.blinkDetector(LeftEyePoint)
            rightRatio, _, _ = m.blinkDetector(RightEyePoint)

            blinkRatio = (leftRatio + rightRatio) / 2

            if blinkRatio > BLINK_THRESHOLD:
                COUNTER += 1
            else:
                if COUNTER > CLOSED_EYES_FRAME:
                    TOTAL_BLINKS += 1
                    COUNTER = 0

            _, pos, _ = m.EyeTracking(frame, grayFrame, RightEyePoint)
            flags['eyePosition'] = pos

            # Emit eye position only if 1 second has passed
            current_time = time.time()
            if current_time - last_emit_time >= 1:
                    if pos == "Center":
                        CENTER_COUNTER += 1
                    else:
                        CENTER_COUNTER = 0  

                    if CENTER_COUNTER >= 3:
                        pos = "Select"
                        CENTER_COUNTER = 0

                    try:
                        socketio.emit('eye_position', {'position': pos})
                    except Exception as e:
                        print(f"⚠️ WebSocket Error: {e}")

                    last_emit_time = current_time

        SECONDS = time.time() - START_TIME
        FPS = FRAME_COUNTER / SECONDS

        key = cv.waitKey(1)
        if key == ord('q'):
            break

    camera.release()
    cv.destroyAllWindows()

# Start camera capture in a separate thread
camera_thread = threading.Thread(target=capture_camera)
camera_thread.start()

@app.route('/api/flags', methods=['GET'])
def handle_flags():
    return jsonify(flags)

@socketio.on('connect')
def handle_connect():
    print("Cliente conectado a WebSocket")
    emit('server_message', {'message': 'Conexión exitosa con WebSocket'})

@socketio.on('command')
def handle_command(data):
    print(f"Comando recibido: {data}")
    # Ejemplo: manejar comandos desde el cliente WebSocket
    if data.get('action') == 'left':
        emit('server_message', {'response': 'Movimiento a la izquierda ejecutado'})
    elif data.get('action') == 'right':
        emit('server_message', {'response': 'Movimiento a la derecha ejecutado'})

if __name__ == '__main__':
    socketio.run(app, host='127.0.0.1', port=5000)
