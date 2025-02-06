export interface Categoria {
    id: string;
    titulo: string;
    descripcion: string;
    ruta: string;
    img?: string; 
    subcategoriasIds: string[];
}

export interface Subcategoria {
    id: string;
    titulo: string;
    descripcion: string;
    img?: string;
}


