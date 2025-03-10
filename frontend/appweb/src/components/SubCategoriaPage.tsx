import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSubcategoria } from "../services/categoryService";
import { Subcategoria } from "../types";
import Loader from "./Loader";

const SubcategoriaPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate(); // Hook para manejar navegación
    const [subcategoria, setSubcategoria] = useState<Subcategoria | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadSubcategoria = async () => {
            if (!id) return;

            try {
                setIsLoading(true);
                const data = await getSubcategoria(id);
                
                // Si la subcategoría es "Retroceder", ir a la página principal
                if (data.titulo === "Retroceder") {
                    navigate("/"); // Redirigir a la página principal
                    return;
                }

                setSubcategoria(data);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Error desconocido"
                );
            } finally {
                setIsLoading(false);
            }
        };

        loadSubcategoria();
    }, [id, navigate]);

    return (
        <>
            {isLoading && (
                <div>
                    <Loader />
                    <p className="pt-10 text-2xl text-center">
                        Cargando subcategoría...
                    </p>
                </div>
            )}

            {error && (
                <div className="text-center">
                    <span className="text-5xl mb-4">⚠️</span>
                    <p className="text-3xl font-semibold text-center text-red-600 mb-2">
                        Ha ocurrido un error!
                    </p>
                    <p className="text-xl text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                    >
                        Reintentar
                    </button>
                </div>
            )}

            {!error && !isLoading && subcategoria && (
                <div className="my-auto text-center">
                    <div className="text-2xl font-bold mb-4">
                        Has seleccionado
                    </div>
                    <div className="text-5xl md:text-8xl font-bold mb-4 text-cyan-500">
                        {subcategoria.titulo}
                    </div>
                    {subcategoria.img && (
                        <img
                            src={subcategoria.img}
                            alt={subcategoria.titulo}
                            className="w-full max-w-md mx-auto rounded-lg shadow-lg mb-4"
                        />
                    )}
                    <p className="text-2xl text-gray-800">
                        En breve alguien acudirá de acuerdo a tu solicitud. Gracias por tu paciencia.
                    </p>
                    <p className="text-gray-700">
                        Motivo: {subcategoria.descripcion}
                    </p>
                </div>
            )}
        </>
    );
};

export default SubcategoriaPage;
