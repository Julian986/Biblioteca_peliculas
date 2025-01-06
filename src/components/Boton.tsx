import React, { useContext, useState } from "react";
import { Modal, Button, CloseButton } from "react-bootstrap";
import './Boton.css';
import { useSaldo } from "../context/SaldoContext";
import { useCategoria } from "../context/CategoriaContext";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

const Boton = () => {

  // CATEGORIAS DE PELICULAS
  const {categoria, setCategoria} = useCategoria();

  const handleCategoriaClick = (categoriaSeleccionada:any) => {
    setCategoria(categoriaSeleccionada); // Actualiza la categoría
    handleClose(); // Opcional: cerrar el modal al seleccionar
  };
 
 
 
  /* Saldo context */

  const{saldo, modificarSaldo} = useSaldo();

  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const[showRange, setShowRange] = useState(false);
  const[rangeValue, setRangeValue] = useState(0);


  const handleDeposit = () => {
      setShowRange(true);
    }

      // Texto de deposito o retiro

      const[mensaje, setMensaje] = useState('');
      const texto = document.getElementById('texto');
      
    
      const notHandleDeposit = (accion: string) => {
        setShowRange(false);
        
        if (accion === 'confirmar') {
          if (depositarRetirar === 'depositar') {
            modificarSaldo(saldo + rangeValue * 100);
            texto!.className = 'textoDeposito';
            setMensaje(`Se han depositado ${rangeValue * 100} usd!`);
            setTimeout(() => {
              texto!.className = 'textoNone';
            }, 3000);
          } else if (depositarRetirar === 'retirar') {
            const amountToWithdraw = rangeValue * 100;
            
            // Verificar si el saldo es suficiente para retirar
            if (saldo >= amountToWithdraw) {
              modificarSaldo(saldo - amountToWithdraw);
              texto!.className = 'textoDeposito';
              setMensaje(`Se han retirado ${amountToWithdraw} usd!`);
              setTimeout(() => {
                texto!.className = 'textoNone';
              }, 3000);
            } else {
              // Saldo insuficiente, mostrar mensaje de error
              texto!.className = 'textoDeposito';
              setMensaje(`Error: Saldo insuficiente.`);
              setTimeout(() => {
                texto!.className = 'textoNone';
              }, 3000);
            }
          }
        }
      };
      

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRangeValue(parseFloat(e.target.value)); // Actualiza el valor del rango
  }

  const[depositarRetirar, setDepositarRetirar] = useState('')
  
  const accionDinero = (depRet: string) => {
      if(depRet == "depositar") setDepositarRetirar('depositar');
      else if(depRet == "retirar") setDepositarRetirar('retirar');
  }



  return (
    <>
      <button
        onClick={handleShow}
        className="boton2"
      >
          <FontAwesomeIcon icon={faGear} />
         <span className="saldo-valor">${saldo}</span>

      </button>

      <Modal show={showModal} onHide={handleClose} className="miModal">
      <Modal.Header closeButton className="modalHeader">
          <Modal.Title>
            <ul>
              <li
                className={`${categoria === "Todo" ? "active" : ""}`}
                onClick={() => handleCategoriaClick("Todo")}
              >
                Todo
              </li>
              <li
                className={categoria === "Comedia" ? "active" : ""}
                onClick={() => handleCategoriaClick("Comedia")}
              >
                Comedia
              </li>
              <li
                className={categoria === "Suspenso" ? "active" : ""}
                onClick={() => handleCategoriaClick("Suspenso")}
              >
                Suspenso
              </li>
              <li
                className={categoria === "Terror" ? "active" : ""}
                onClick={() => handleCategoriaClick("Terror")}
              >
                Terror
              </li>
              <li
                className={categoria === "Ciencia-ficcion" ? "active" : ""}
                onClick={() => handleCategoriaClick("Ciencia-ficcion")}
              >
                Ciencia ficción
              </li>
              <li
                className={categoria === "Romance" ? "active" : ""}
                onClick={() => handleCategoriaClick("Romance")}
              >
                Romance
              </li>
              <li
                className={categoria === "Fantasia" ? "active" : ""}
                onClick={() => handleCategoriaClick("Fantasia")}
              >
                Fantasia 
              </li>
              <li
                className={categoria === "Accion" ? "active" : ""}
                onClick={() => handleCategoriaClick("Accion")}
              >
                Acción
              </li>

              <li
                className={categoria === "Animacion" ? "active" : ""}
                onClick={() => handleCategoriaClick("Animacion")}
              >
                Animación
              </li>

              <li
                className={categoria === "Aventura" ? "active" : ""}
                onClick={() => handleCategoriaClick("Aventura")}
              >
                Aventura
              </li>

              <li
                className={categoria === "Drama" ? "active" : ""}
                onClick={() => handleCategoriaClick("Drama")}
              >
                Drama
              </li>

              <li
                className={categoria === "Crimen" ? "active" : ""}
                onClick={() => handleCategoriaClick("Crimen")}
              >
                Crimen
              </li>

              <li
                className={categoria === "Musical" ? "active" : ""}
                onClick={() => handleCategoriaClick("Musical")}
              >
                Musical
              </li>

              <li
                className={categoria === "Biografia" ? "active" : ""}
                onClick={() => handleCategoriaClick("Biografia")}
              >
                Biografia
              </li>

            </ul>
          </Modal.Title>
          <CloseButton
            variant="white"
            onClick={handleClose}
            aria-label="Cerrar"
            className="botonCerrar"
          />
        </Modal.Header>

        <Modal.Body className="modalBody">

          <h3 className="saldo">$ {saldo}</h3> 

        {!showRange ? (
          <div className="botones">
            <button type="button" className="btn btn-primary depositar" onClick={() => {handleDeposit(), accionDinero('depositar')}}>Depositar</button> <button type="button" className="btn btn-warning retirar" onClick={() => {handleDeposit(), accionDinero('retirar')}}>Retirar</button>
          </div>
        ) : (
          <div className="labelContenedor">
          <label htmlFor="customRange3" className="form-label">
            Saldo a {depositarRetirar}:  ${rangeValue * 100}
          </label>
          <input
            type="range"
            className="form-range"
            min={0}
            max={5}
            step={0.5}
            id="customRange3"
            value={rangeValue}
            onChange={handleRangeChange}
          />
          </div>
        )}

 

        </Modal.Body>
        <Modal.Footer className="modalFooter">
  
          {!showRange ? (
            <div className="botones">
              
            </div>
          ) : (
            <div className="botones">
            <button type="button" className="btn btn-success confirmar botonsito" onClick={() => notHandleDeposit('confirmar')}>Confirmar</button> <button type="button" className="btn btn-warning cancelar botonsito" onClick={() => notHandleDeposit('cancelar')}>Cancelar</button>
          </div>
        )}

          <div className="textoContainer">
          <p id="texto" className="textoNone"> {mensaje} </p>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Boton;
