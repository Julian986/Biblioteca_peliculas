import { createContext, ReactNode, useContext, useState } from "react";
import { useCategoria } from "./CategoriaContext";


type Pelicula = {
    id:number;
    titulo: string;
    description: string;
    descriptionModal?: string; // Opcional
    icono?: string;
    fecha?: string; // Opcional
    video?: string; // Opcional
    precio: number;
    categoria: string;
}

type InventarioContextType = {
    inventario: Pelicula[];
    agregarAlInventario: (pelicula: Pelicula) => void;
    eliminarDelInventario: (id:number) => void;
}

const InventarioContext = createContext<InventarioContextType | undefined>(undefined);

export const InventarioProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const[inventario, setInventario] = useState<Pelicula[]>([]);

    const agregarAlInventario = (pelicula: Pelicula) => {
        // Evita duplicados
        if(!inventario.some((p) => p.id == pelicula.id)){
            setInventario([...inventario, pelicula]);
        }
    }

    const eliminarDelInventario = (id:number) => {
        setInventario(inventario.filter((pelicula) => pelicula.id !== id));
    }

    return(
        <InventarioContext.Provider value={{inventario, agregarAlInventario, eliminarDelInventario}}>
            {children}
        </InventarioContext.Provider>
    )
}

// Hook para usar el contexto

export const useInventario = () => {
    const context = useContext(InventarioContext);
    if(!context){
        throw new Error("useInventario debe usarse dentro de un InventarioProvider");
    }
    return context;
}