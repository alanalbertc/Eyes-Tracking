import React from "react";
import Carousel from "./Carousel";
import { Navigate, useNavigate } from "react-router-dom";

interface SubcategoriaPageProps {
  subcategoria: string;
}

const SubcategoriaPage: React.FC<SubcategoriaPageProps> = ({ subcategoria }) => {
  const navigate = useNavigate();

  // Datos específicos para cada subcategoría
  const subcategoriasData: Record<string, { titulo: string; descripcion: string; ruta: string;}[]> = {
    "1": [
      { titulo: "Subcategoría 1 - Título 1", descripcion: "Descripción 1", ruta: "/subcategoria-1"},
      { titulo: "Subcategoría 1 - Título 2", descripcion: "Descripción 2", ruta: "/subcategoria-2"},
      { titulo: "Subcategoría 1 - Título 3", descripcion: "Descripción 3", ruta: "/subcategoria-1" },
    ],
    "2": [
        { titulo: "Subcategoría 2 - Título 1", descripcion: "Descripción 1", ruta: "/subcategoria-1"},
        { titulo: "Subcategoría 2 - Título 2", descripcion: "Descripción 2", ruta: "/subcategoria-2"},
      { titulo: "Subcategoría 2 - Título 3", descripcion: "Descripción 3", ruta: "/subcategoria-3"},
    ],
    "3": [
      { titulo: "Subcategoría 3 - Título 1", descripcion: "Descripción 1", ruta: "/subcategoria-1"},
      { titulo: "Subcategoría 3 - Título 2", descripcion: "Descripción 2", ruta: "/subcategoria-2"},
      { titulo: "Subcategoría 3 - Título 3", descripcion: "Descripción 3", ruta: "/subcategoria-3"},
    ],
  };

  // Obtiene los datos correspondientes a la subcategoría
  const items = subcategoriasData[subcategoria] || [];

  return (
    <>
      <div>
      <h1 style={{ textAlign: "center" }}>Subcategoría {subcategoria}</h1>
        <Carousel items={items} onCardClick={() => {}} />
      </div>
      <div>
        <button type="button" className="btn btn-primary" onClick={() => {navigate(-1)}}>atras</button>
      </div>
    </>
  );
};

export default SubcategoriaPage;
