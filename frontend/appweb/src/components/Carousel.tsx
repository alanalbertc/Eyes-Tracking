import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import CarouselControl from "./CarouselControl";

interface CarouselProps {
  items: { titulo: string; descripcion: string; ruta?: string, img?: string }[];
  onCardClick: (index: number) => void;
}

const Carousel: React.FC<CarouselProps> = ({ items, onCardClick }) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [socket, setSocket] = useState<any>(null);

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
      console.log("Posición del ojo recibida:", data);

      if (carouselRef.current) {
        const carouselInstance = new (window as any).bootstrap.Carousel(
          carouselRef.current
        );

        // Desplegar el carrusel basado en la posición del ojo
        if (data.position === "Left") {
          carouselInstance.prev();
        } else if (data.position === "Right") {
          carouselInstance.next();
        }
      }
    });

    // Limpiar al desmontar
    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <div
      id="carouselExampleControls"
      className="carousel slide"
      ref={carouselRef}
    >
      <div className="carousel-inner" style={{ border: "none"}}> 
        {items.map((item, index) => (
          <div
            key={index}
            className={index === 0 ? "carousel-item active" : "carousel-item"}
          >
            <div
              className="card"
              style={{ cursor: "pointer", border:"none" }}
              onClick={() => onCardClick(index)}
            >
              <div className="card-body">
                <div className="w-full flex text-center flex">
                  {
                    item.img && (
                      <img className="w-20 mx-auto " src={item.img} />
                    )
                  }
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

      <CarouselControl 
        direction="prev" 
        targetId="carouselExampleControls" 
      />
      
      <CarouselControl 
        direction="next" 
        targetId="carouselExampleControls" 
      />
    </div>
  );
};

export default Carousel;
