import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCategorias, getSubcategoriasByCategoria } from "../services/categoryService";
import { Categoria, Subcategoria } from "../types";

const SubcategoriaPage: React.FC = () => {
    const { categoriaId } = useParams();
    const [categoria, setCategoria] = useState<Categoria | null>(null);
    const [subcategorias, setSubcategorias] = useState<Subcategoria[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            if (!categoriaId) return;
            
            try {
                setIsLoading(true);
                // Obtener la categoría
                const categorias = await getCategorias();
                const categoriaEncontrada = categorias.find(cat => cat.id === categoriaId);
                
                if (!categoriaEncontrada) {
                    throw new Error('Categoría no encontrada');
                }
                
                setCategoria(categoriaEncontrada);
                
                // Obtener las subcategorías
                const subcategoriasData = await getSubcategoriasByCategoria(categoriaId);
                setSubcategorias(subcategoriasData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error desconocido');
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [categoriaId]);

    if (isLoading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!categoria) return <div>Categoría no encontrada</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{categoria.titulo}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subcategorias.map((subcategoria) => (
                    <div 
                        key={subcategoria.id}
                        className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                        {subcategoria.img && (
                            <img 
                                src={subcategoria.img} 
                                alt={subcategoria.titulo}
                                className="w-full h-40 object-cover rounded-lg mb-2"
                            />
                        )}
                        <h2 className="text-xl font-semibold">{subcategoria.titulo}</h2>
                        <p className="text-gray-600">{subcategoria.descripcion}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubcategoriaPage;