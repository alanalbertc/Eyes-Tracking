import { mockCategorias } from "../data/categorias";
import { mockSubcategorias } from "../data/subcategorias";
import { Categoria, Subcategoria } from "../types";

export const getCategorias = async (): Promise<Categoria[]> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const randomNumber = Math.random();
    
    if (randomNumber < 0.01) {
        return Promise.reject(new Error('Error en la conexión al servidor'));
    } else {
        return Promise.resolve(mockCategorias);
    }
};

export const getSubcategoria = async (id: string): Promise<Subcategoria | null> => {
    await new Promise(resolve => setTimeout(resolve, 500)); 
    
    try {
        const subcategoria = mockSubcategorias.find(sub => sub.id === id);
        
        if (!subcategoria) {
            return null;
        }
        
        return Promise.resolve(subcategoria);
    } catch (error) {
        return Promise.reject(new Error('Error al obtener la subcategoría'));
    }
};


export const getSubcategoriasByCategoria = async (categoriaId: string): Promise<Subcategoria[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    try {
        const categoria = mockCategorias.find(cat => cat.id === categoriaId);
        
        if (!categoria) {
            return Promise.reject(new Error('Categoría no encontrada'));
        }
        
        const subcategorias = mockSubcategorias.filter(sub => 
            categoria.subcategoriasIds.includes(sub.id)
        );

        return Promise.resolve(subcategorias);
    } catch (error) {
        return Promise.reject(new Error('Error al obtener las subcategorías'));
    }
};