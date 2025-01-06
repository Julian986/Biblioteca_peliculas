import React, { createContext, ReactNode, useContext, useState } from "react";


// Definir el tipo del contexto
interface CategoriaContextType {
    categoria: string;
    setCategoria: React.Dispatch<React.SetStateAction<string>>;
  }

// Crear el contexto
const CategoriaContext = createContext<CategoriaContextType | undefined>(undefined);
// Crear un hook para usar el contexto más fácilmente
export const useCategoria = () => {
    const context = useContext(CategoriaContext);
  
    if (!context) {
      throw new Error("useCategoria debe ser usado dentro de un CategoriaProvider");
    }
  
    return context;
  };
// Proveedor del contexto
export const CategoriaProvider = ({ children }:{children:ReactNode}) => {
  const [categoria, setCategoria] = useState("Todo"); // Estado inicial

  return (
    <CategoriaContext.Provider value={{ categoria, setCategoria }}>
      {children}
    </CategoriaContext.Provider>
  );
};
