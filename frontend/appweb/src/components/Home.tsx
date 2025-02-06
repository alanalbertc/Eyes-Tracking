import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Carousel from "./Carousel";

import { getCategorias } from "../services/categoryService";
import { Categoria } from "../types";

import Loader from "./Loader";
import FirstUse from "./FirstUse";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadCategorias = async () => {
            try {
                setIsLoading(true);
                const data = await getCategorias();
                setCategorias(data);
            } catch (err) {
                setError("Error al cargar las categorías");
                console.error("Error:", err);
            } finally {
                setIsLoading(false);
            }
        };

        loadCategorias();
    }, []);

    // aqui iba el muck

    const handleCardClick = (index: number) => {
        if (index >= 0 && index < categorias.length) {
            navigate(categorias[index].id); // Redirigir a la ruta de la subcategoría correspondiente
        }
    };

    return (
        <>
            {isLoading && <Loader />}

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

            {!error && !isLoading && (
                <>
                    <div>
                        <div className="w-full h-full pt-10">
                            <Carousel
                                items={categorias}
                                onCardClick={handleCardClick} // Pasar la función para gestionar el clic en el carrusel
                            />
                            <div className="flex items-center justify-center">
                                <FirstUse />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Home;
