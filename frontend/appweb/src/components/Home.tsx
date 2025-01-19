import React from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "./Carousel";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const categorias = [
    { titulo: "Categoría 1", descripcion: "Descripción de la Categoría 1", ruta: "/subcategoria-1" },
    { titulo: "Categoría 2", descripcion: "Descripción de la Categoría 2", ruta: "/subcategoria-2" },
    { titulo: "Categoría 3", descripcion: "Descripción de la Categoría 3", ruta: "/subcategoria-3" },
  ];

  const handleCardClick = (index: number) => {
    // Asegurémonos de que el índice no esté fuera de rango
    if (index >= 0 && index < categorias.length) {
      navigate(categorias[index].ruta); // Redirigir a la ruta de la subcategoría correspondiente
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Bienvenido a la Página Principal</h1>
      <Carousel
        items={categorias}
        onCardClick={handleCardClick}  // Pasar la función para gestionar el clic en el carrusel
      />
    </div>
  );
};

export default Home;
