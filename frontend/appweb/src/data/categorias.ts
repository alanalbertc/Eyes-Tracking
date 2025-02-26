import { Categoria } from "../types";


export const mockCategorias: Categoria[] = [
    {
        id: "cat_1",
        titulo: "Comida",
        descripcion: "Solicitar alimentos, bebidas y asistencia para comer",
        ruta: "/comida",
        img: "images/1.png",
        subcategoriasIds: ["sub_0", "sub_1", "sub_2"] // Desayuno, Almuerzo, Cena
    },
    {
        id: "cat_2",
        titulo: "Asistencia Personal",
        descripcion: "Ayuda con higiene personal, vestimenta y movilidad",
        ruta: "/asistencia-personal",
        img: "images/2.png",
        subcategoriasIds: ["sub_3", "sub_4", "sub_5"] // Higiene Personal, Vestimenta, Movilidad
    },
    {
        id: "cat_3",
        titulo: "Asistencia Médica",
        descripcion: "Atención médica, medicamentos y emergencias",
        ruta: "/asistencia-medica",
        img: "images/3.png",
        subcategoriasIds: ["sub_8", "sub_9", "sub_10"] // Medicamentos, Emergencia, Curaciones
    },
    {
        id: "cat_4",
        titulo: "Entretenimiento",
        descripcion: "Actividades recreativas, multimedia y comunicación",
        ruta: "/entretenimiento",
        img: "images/4.png",
        subcategoriasIds: ["sub_11", "sub_12", "sub_13", "sub_14"] // TV, Música, Lectura, Juegos
    },
    {
        id: "cat_5",
        titulo: "Necesidades",
        descripcion: "Necesidades básicas, baño y cuidados esenciales",
        ruta: "/necesidades",
        img: "images/5.png",
        subcategoriasIds: ["sub_15", "sub_16", "sub_17", "sub_18"] // Baño, Cambio Posición, Limpieza, Temperatura
    },
    {
        id: "cat_6",
        titulo: "Otro",
        descripcion: "Solicitudes adicionales y asistencia variada",
        ruta: "/otro",
        img: "images/6.png",
        subcategoriasIds: ["sub_19", "sub_20", "sub_21"] // Llamar, Ayuda Especial, Reportar Problema
    }
];