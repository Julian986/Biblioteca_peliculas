import { createContext, ReactNode, useContext, useState } from "react";


type SaldoModel = {
    saldo: number;
    modificarSaldo: (nuevoSaldo: number) => void;
}

const SaldoContext = createContext<SaldoModel | null>(null);

export const SaldoProvider = ({children}:{children:ReactNode}) => {
    const [saldo, setSaldo] = useState(300);

    const modificarSaldo = (nuevoSaldo: number) => {
        setSaldo(nuevoSaldo);
    }

    return(
        <SaldoContext.Provider value={{saldo, modificarSaldo}}>
            {children}
        </SaldoContext.Provider>
    )
}


export const useSaldo = ():SaldoModel => {
    const context = useContext(SaldoContext);
    if(!context){
        throw new Error('useSaldo debe ser usado dentro del provider');
    }
    return context;
}