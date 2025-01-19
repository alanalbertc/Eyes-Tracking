import React from "react";
import Carousel from "./Carousel";

const SecondCarouselPage: React.FC = () => {
  const tarjetas = [
    { titulo: "Nuevo Título 1", descripcion: "Nueva Descripción 1" },
    { titulo: "Nuevo Título 2", descripcion: "Nueva Descripción 2" },
    { titulo: "Nuevo Título 3", descripcion: "Nueva Descripción 3" },
  ];

  return <Carousel items={tarjetas} />;
};

export default SecondCarouselPage;
