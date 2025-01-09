import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 
import './Menu.css';
import { Link, useLocation } from 'react-router-dom';

const Menu = ({toggleMenu} : {toggleMenu: () => void}) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  // Inicializa el estado con el valor guardado en localStorage (si existe), o con un valor por defecto.
  const [nombrePerfil, setNombrePerfil] = useState(() => {
    const savedName = localStorage.getItem('nombrePerfil');
    return savedName || "Mi perfil"; // Si no hay nombre guardado, usa "Mi perfil"
  });
  
  const [editarNombre, setEditarNombre] = useState(false);

  // Función para manejar el cambio en el input del nombre
  const manejarCambioNombre = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNombrePerfil(e.target.value);
  };

  // Guardar el nombre en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('nombrePerfil', nombrePerfil);
  }, [nombrePerfil]);

  // Función para mostrar u ocultar el input de edición
  const toggleEditarNombre = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLInputElement) return;
    setEditarNombre(!editarNombre);
  };

  const salirDeEdicion = () => {
    setEditarNombre(false);
  };

  return (
    <div
      className="position-fixed top-0 start-0 bg-dark p-3 text-white d-flex flex-column"
      style={{
        width: "280px",
        height: "100vh",
        boxShadow: "4px 0 6px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
      }}
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <svg className="bi me-2" width="40" height="32">
          <use xlinkHref="#bootstrap" />
        </svg>
        <span className="fs-4">ReelFlix</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto" style={{ flexGrow: 1 }}>
        <li className="nav-item" onClick={toggleMenu}>
          <Link to="/" className={`nav-link ${isActive("/") ? "active" : "text-white"} item`} aria-current="page">
            <i className="bi bi-shop-window"></i>
            Tienda
          </Link>
        </li>

        <li onClick={toggleMenu}>
          <Link
            to="/inventario"
            className={`nav-link ${isActive("/inventario") ? "active" : "text-white"} item`}>
            <i className="bi bi-box-seam-fill"></i>
            Mi inventario
          </Link>
        </li>
      </ul>
      <hr />
      <div className="dropdown mt-auto">
        <a
          href="#"
          className="d-flex align-items-center text-white text-decoration-none"
          id="dropdownUser1"
          onClick={toggleEditarNombre}
        >
          <img
            src="https://github.com/mdo.png"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong className='perfil'>
            {editarNombre ? (
              <input
                type="text"
                value={nombrePerfil}
                onChange={manejarCambioNombre}
                onBlur={salirDeEdicion} // Sale de edición cuando pierde el foco
                className="form-control"
                style={{ backgroundColor: 'transparent', border: 'none', color: 'white' }}
              />
            ) : (
              nombrePerfil
            )}
          </strong>
        </a>
      </div>
    </div>
  );
};

export default Menu;

