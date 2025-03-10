import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import CarouselControl from "./CarouselControl";

interface CarouselProps {
  items: { titulo: string; descripcion: string; ruta?: string; img?: string }[];
  onCardClick: (index: number) => void;
}

const Carousel: React.FC<CarouselProps> = ({ items, onCardClick }) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [socket, setSocket] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(0); // Mantiene el valor actualizado del índice
  const [lastSelectTime, setLastSelectTime] = useState<number>(0);

  useEffect(() => {
    // Establecer conexión con el servidor usando Socket.IO
    const newSocket = io("http://127.0.0.1:5000/", {
      transports: ["websocket"], // Asegúrate de usar el protocolo correcto
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Conexión WebSocket establecida");
    });

    newSocket.on("disconnect", () => {
      console.log("Conexión WebSocket cerrada");
    });

    newSocket.on("reconnect", (attemptNumber: number) => {
      console.log(`Reconectado exitosamente en el intento ${attemptNumber}`);
    });

    // Evento para recibir la posición del ojo y controlar el carrusel
    newSocket.on("eye_position", (data) => {
      const now = Date.now();
      console.log("Posición del ojo recibida:", data);

      if (carouselRef.current) {
        const carouselInstance = new (window as any).bootstrap.Carousel(carouselRef.current);

        if (data.position === "Left") {
          carouselInstance.prev();
          setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex > 0 ? prevIndex - 1 : items.length - 1;
            currentIndexRef.current = newIndex; // Actualizar referencia
            return newIndex;
          });
        } else if (data.position === "Right") {
          carouselInstance.next();
          setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex < items.length - 1 ? prevIndex + 1 : 0;
            currentIndexRef.current = newIndex; // Actualizar referencia
            return newIndex;
          });
        } else if (data.position === "Select") {
          if (now - lastSelectTime < 2000) return; // Evita seleccionar rápidamente
          setLastSelectTime(now);
          onCardClick(currentIndexRef.current); // Usar la referencia del índice actual
        }
      }
    });

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <div id="carouselExampleControls" className="carousel slide" ref={carouselRef}>
      <div className="carousel-inner" style={{ border: "none" }}>
        {items.map((item, index) => (
          <div key={index} className={index === currentIndex ? "carousel-item active" : "carousel-item"}>
            <div className="card" style={{ cursor: "pointer", border: "none" }} onClick={() => onCardClick(index)}>
              <div className="card-body">
                <div className="w-full flex text-center flex">
                  {item.img && <img className="w-20 mx-auto" src={item.img} alt={item.titulo} />}
                </div>
                <div className="text-3xl md:text-6xl font-bold text-center first-letter:text-cyan-500 mb-2" style={{ textAlign: "center" }}>
                  {item.titulo}
                </div>
                <p className="md:text-2xl text-gray-600 card-text" style={{ textAlign: "center" }}>
                  {item.descripcion}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CarouselControl direction="prev" targetId="carouselExampleControls" />
      <CarouselControl direction="next" targetId="carouselExampleControls" />
    </div>
  );
};

export default Carousel;
