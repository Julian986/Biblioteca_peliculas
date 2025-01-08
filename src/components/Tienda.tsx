import { useState } from "react";
import { Card, Button, Row, Col, Modal, Toast, ToastContainer, CloseButton } from "react-bootstrap";
import './Tienda.css';
import { useInventario } from "../context/InventarioContext";
import { useSaldo } from "../context/SaldoContext";

import peliculasData from '../database.json';
import { useCategoria } from "../context/CategoriaContext";

interface Pelicula {
  id: number
  titulo: string;
  description: string;
  descriptionModal?: string; // Opcional
  icono?: string;
  fecha?: string; // Opcional
  video?: string; // Opcional
  precio: number;
  categoria: string;
}

interface TiendaProps{
  peliculasC?: Pelicula[];
}


// Componente Tienda
const Tienda = ({peliculasC}: TiendaProps) => {

  console.log(peliculasC)

  /* FILTRAR PELICULAS POR CATEGORIA */
  const{categoria} = useCategoria();
  const peliculasFiltradas =
    categoria === "Todo"
      ? peliculasData
      : peliculasData.filter((peliculaC) => peliculaC.categoria === categoria);

  // Contexts
  const { saldo, modificarSaldo } = useSaldo();
  const { inventario, agregarAlInventario } = useInventario();

  
  // Lista de películas desde el JSON
  const peliculas = peliculasData;

  // Configuración para el modal
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Pelicula | null>(null);

  // Toast
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleShowDetails = (pelicula:any) => {
    setSelectedMovie(pelicula);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedMovie(null); // Limpia la película seleccionada
  };

  const handleAgregarAlInventario = (pelicula:any) => {
    // Verificar si la película ya está en el inventario
    const peliculaEnInventario = inventario.some((item) => item.titulo === pelicula.titulo);

    if (peliculaEnInventario) {
      setToastMessage(`Ya tienes la película "${pelicula.titulo}" en tu inventario.`);
      setShowToast(true);
      return;
    }

    // Verificar si hay saldo suficiente
    if (saldo >= pelicula.precio) {
      agregarAlInventario(pelicula);
      setToastMessage(`Se agregó "${pelicula.titulo}" al inventario.`);
      setShowToast(true);
      modificarSaldo(saldo - pelicula.precio);
    } else {
      setToastMessage("No tienes suficiente saldo para agregar esta película.");
      setShowToast(true);
    }
  };

  return (
    <div className="container mt-4">
      <Row>
        {peliculasFiltradas
        .map((pelicula, index) => (
          <Col key={index} xs={12} sm={12} md={6} lg={4} xl={4} className="mb-4">
            <Card style={{ background: "#161616", color: "white", border: "2px solid #4b4b4b" }}>
              <Card.Img variant="top" src={pelicula.icono} className="miImagen" />
              <Card.Body>
                <div className="contenedorHeader">
                  <Card.Title className="peliTitulo">{pelicula.titulo}</Card.Title>
                  <p className="precio">${pelicula.precio}</p>
                </div>

                <Card.Text className="peliDes">{pelicula.description}</Card.Text>

                <Button variant="primary" className="peliBoton" onClick={() => handleAgregarAlInventario(pelicula)}>
                  Comprar
                </Button>{" "}
                <Button variant="info" onClick={() => handleShowDetails(pelicula)} className="peliBoton">
                  Ver más
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal */}
      <Modal className="peliModal" show={showModal} onHide={handleClose} centered>
        <Modal.Header className="headerPosta">
          <div className="headerModal">
            <Modal.Title className="titulo">{selectedMovie?.titulo || "Detalles"}</Modal.Title>
            <p className="fecha">{selectedMovie?.fecha || "Fecha no disponible"}</p>
          </div>

          <CloseButton
            variant="white"
            onClick={handleClose}
            aria-label="Cerrar"
            className="botonCerrar"
          />
        </Modal.Header>
        <Modal.Body className="miModalBody">
          <iframe
            className="videoModal"
            width="560"
            height="315"
            src={selectedMovie?.video}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <div className="contenedorTexto">
            <p className="textoo">{selectedMovie?.descriptionModal || "Descripción no disponible"}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast */}
      <ToastContainer className="p-3 miToast">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Inventario</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default Tienda;
