import { useState } from "react";
import { Card, Button, Row, Col, Modal, CloseButton } from "react-bootstrap";
import "./Inventario.css";
import { useInventario } from "../context/InventarioContext";
import { useCategoria } from "../context/CategoriaContext";

interface Pelicula {
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

interface TiendaProps{
  peliculasC?: any[];
}

const Inventario = ({peliculasC}: TiendaProps) => {
  // Estado para saber si el menú está abierto
  const [menuAbierto] = useState(false);

  console.log(peliculasC);

  // Consumiendo el contexto
  const { inventario, eliminarDelInventario } = useInventario();
  const inventarioA: Pelicula[] = inventario;

  // Config para el modal
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Pelicula | null>(null);

  // Filtrar películas por categoría
  const { categoria } = useCategoria();
  const peliculasFiltradas =
    categoria === "Todo"
      ? inventarioA
      : inventarioA.filter((peliculaC) => peliculaC.categoria === categoria);

  const handleShowDetails = (pelicula: typeof inventario[number]) => {
    setSelectedMovie(pelicula);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedMovie(null); // Limpia la película seleccionada
  };

  return (
    <div className={`container mt-4 ${menuAbierto ? "menu-abierto" : ""}`}>
    {/* Mostrar h4 solo si el menú no está abierto */}
    {!menuAbierto && (
      <div className="text-center text-muted">
        {peliculasFiltradas.length === 0 ? (
          categoria === "Todo" ? (
            <h4>Aún no tienes películas en tu inventario</h4>
          ) : (
            <h4>No tienes películas en esta categoría</h4>
          )
        ) : null}
      </div>
    )}

      {peliculasFiltradas.length > 0 && (
        <Row>
          {peliculasFiltradas.map((pelicula) => (
            <Col
              key={pelicula.titulo}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={4}
              className="mb-4"
            >
              <Card
                style={{
                  background: "#161616",
                  color: "white",
                  border: "2px solid #4b4b4b",
                }}
              >
                <Card.Img variant="top" src={pelicula.icono} />
                <Card.Body>
                  <Card.Title>{pelicula.titulo}</Card.Title>
                  <Card.Text>{pelicula.description}</Card.Text>
                  <Button
                    variant="info"
                    className="inventarioBtn"
                    onClick={() => handleShowDetails(pelicula)}
                  >
                    Ver detalles
                  </Button>
                  <i
                    className="bi bi-trash iconoBasura"
                    onClick={() =>
                      eliminarDelInventario(pelicula.id)
                    }
                    style={{
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                  ></i>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Modal */}
      <Modal className="peliModal" show={showModal} onHide={handleClose} centered>
        <Modal.Header className="headerPosta">
          <div className="headerModal">

            <div className="leftHeader">
              <Modal.Title className="titulo">
                {selectedMovie?.titulo || "Detalles"}
              </Modal.Title>
            </div>

            <div className="rightHeader">
              <p className="fecha">
                {selectedMovie?.fecha || "Fecha no disponible"}
              </p>
              
              <CloseButton
              variant="white"
              onClick={handleClose}
              aria-label="Cerrar"
              className="botonCerrar"
            />
              </div>

          </div>


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
            <p className="textoo">
              {selectedMovie?.descriptionModal || "Descripción no disponible"}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Inventario;
