import { useState } from "react";
import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importa el Router
import "bootstrap-icons/font/bootstrap-icons.css"; // Importa las clases de Bootstrap Icons
import Menu from "./components/Menu"; // Asegúrate de importar tu componente Menu
import Tienda from "./components/Tienda";
import Inventario from "./components/Inventario";
import Boton from "./components/Boton";

import { SaldoProvider } from "./context/SaldoContext";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar el menú

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Cambia entre abierto/cerrado
  };

  return (
    <SaldoProvider>
      <Router>
        {/* MENU */}
        <div style={{ display: "flex", height: "100%" }}>
          {/* Solo muestra el menú si está abierto */}
          {isMenuOpen && <Menu toggleMenu={toggleMenu} />}

          {/* CONTENIDO PRINCIPAL */}
          <div
            style={{
              flexGrow: 1,
              position: "relative",
              marginLeft: isMenuOpen ? "280px" : "0", // Ajusta según si el menú está abierto o no
              transition: "margin-left 0.3s ease-in-out", // Agrega una transición suave
            }}
          >

            
            {/* Botón para abrir/cerrar el menú */}
            <button
              onClick={toggleMenu}
              className="boton position-fixed"
              style={{
                zIndex: 1050,
                top: '10px',
                left: '10px',
              }}
            >
              <i className="bi bi-list-task"></i>
            </button>

            {/* Rutas principales */}
            <Routes>
            <Route path="/tienda" element={<Tienda peliculasC={[]} />} /> {/* Ruta para Tienda */}
              <Route path="/inventario" element={<Inventario />} /> {/* Ruta para Inventario */}
              <Route path="*" element={<Tienda peliculasC={[]} />} /> {/* Ruta por defecto */}
            </Routes>
          </div>

          {/* BOTÓN DE SALDO */}
          {!isMenuOpen && <Boton />} {/* Solo muestra el botón de saldo si el menú está cerrado */}
        </div>
      </Router>
    </SaldoProvider>
  );
};

export default App;
