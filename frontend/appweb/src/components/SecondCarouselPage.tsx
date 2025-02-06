import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";

import Carousel from "./Carousel";

import { Subcategoria } from "../types";

import Loader from "./Loader";
import { getSubcategoriasByCategoria } from "../services/categoryService";
import FirstUse from "./FirstUse";
// import FirstUse from "./FirstUse";
// import SubcategoriaPage from "./SubCategoriaPage";

const SecondCarouselPage: React.FC = () => {
    const { categoriaId } = useParams<{ categoriaId: string }>();
    const navigate = useNavigate();
    const [subcategorias, setsubcategorias] = useState<Subcategoria[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // useEffect(() => {
    //     const loadSubcategoria = async () => {
    //         if (!categoriaId) return;

    //         try {
    //             setIsLoading(true);
    //             console.log("Searching: " + categoriaId);
    //             const data = await getSubcategoriasByCategoria(categoriaId);
    //             setsubcategorias(data);
    //         } catch (err) {
    //             setError(
    //                 err instanceof Error ? err.message : "Error desconocido"
    //             );
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     loadSubcategoria();
    // }, [categoriaId]);

    useEffect(() => {
        const loadSubcategorias = async () => {
            if (!categoriaId) {
                setError("Categoría no especificada");
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setError(null);
                console.log("Buscando subcategorías para:", categoriaId);
                const data = await getSubcategoriasByCategoria(categoriaId);
                
                if (data.length === 0) {
                    setError("No se encontraron subcategorías");
                    return;
                }
                
                setsubcategorias(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Error desconocido");
            } finally {
                setIsLoading(false);
            }
        };

        loadSubcategorias();
    }, [categoriaId]);

    // aqui iba el muck

    const handleCardClick = (index: number) => {
        if (index >= 0 && index < subcategorias.length) {
            navigate(subcategorias[index].id); // Redirigir a la ruta de la subcategoría correspondiente
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
                                items={subcategorias}
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

export default SecondCarouselPage;
