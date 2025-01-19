import React from "react";

interface CarouselProps {
  items: { titulo: string; descripcion: string; ruta: string }[];
  onCardClick: (index: number) => void; // Recibe un índice al hacer clic
}

const Carousel: React.FC<CarouselProps> = ({ items, onCardClick }) => {
  return (
    <>
      <div
        id="carouselExampleControls"
        className="carousel slide"
      >
        <div className="carousel-inner">
          {items.map((item, index) => (
            <div
              key={index}
              className={index === 0 ? "carousel-item active" : "carousel-item"}
            >
              <div
                className="card"
                style={{ cursor: "pointer" }}
                onClick={() => onCardClick(index)} // Pasa el índice de la tarjeta
              >
                <div className="card-body">
                  <h5 className="card-title" style={{ textAlign: "center" }}>{item.titulo}</h5>
                  <p className="card-text" style={{ textAlign: "center" }}>{item.descripcion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Botón para ir al item anterior */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
          style={{ backgroundColor: "black" }}
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        
        {/* Botón para ir al siguiente item */}
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
          style={{ backgroundColor: "black" }}
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default Carousel;
