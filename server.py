from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2 as cv
import numpy as np
import module as m
import time
import threading

app = Flask(__name__)
CORS(app)

# Variables
flags = {
    'eyePosition': ''
}

COUNTER = 0
TOTAL_BLINKS = 0
CLOSED_EYES_FRAME = 3
BLINK_THRESHOLD = 4
SLEEP_FRAME = 90  # (30 fps * time)
DELAY = 35
FRAME_COUNTER = 0
START_TIME = time.time()
FPS = 0

# Capture thread
def capture_camera():
    global flags, COUNTER, TOTAL_BLINKS, FRAME_COUNTER, FPS
    camera = cv.VideoCapture(0)

    while True:
        FRAME_COUNTER += 1
        ret, frame = camera.read()
        if ret == False:
            break

        grayFrame = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
        height, width = grayFrame.shape
        circleCenter = (int(width / 2), 50)
        image, face = m.faceDetector(frame, grayFrame)
        if face is not None:
            image, PointList = m.faceLandmakDetector(frame, grayFrame, face, False)
            RightEyePoint = PointList[36:42]
            LeftEyePoint = PointList[42:48]
            leftRatio, topMid, bottomMid = m.blinkDetector(LeftEyePoint)
            rightRatio, rTop, rBottom = m.blinkDetector(RightEyePoint)

            blinkRatio = (leftRatio + rightRatio) / 2

            if blinkRatio > BLINK_THRESHOLD:
                COUNTER += 1
            else:
                if COUNTER > CLOSED_EYES_FRAME:
                    TOTAL_BLINKS += 1
                    COUNTER = 0

            mask, pos, color = m.EyeTracking(frame, grayFrame, RightEyePoint)
            flags['eyePosition'] = pos

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

@app.route('/api/flags', methods=['GET', 'POST'])
def handle_flags():
    if request.method == 'GET':
        return jsonify(flags)
    elif request.method == 'POST':
        action = request.json['action']
        if action == 'left':
            flags['leftFlag'] += 1
        elif action == 'right':
            flags['rightFlag'] += 1
        elif action == 'select':
            flags['selectFlag'] += 1
        return jsonify({'message': 'Flags updated successfully'})

if __name__ == '__main__':
    app.run()
