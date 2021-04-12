import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import "firebase/storage"
import "firebase/firestore"

const ModalEvento = ({handleClose, showModal, handleSaveChanges, handleChangeFecha, handleChangeLugar, handleChangeVacuna}) => {

    let lista = JSON.parse(sessionStorage.getItem('listaVacunas'))
    let nombreVac = []
    lista.map((per) => nombreVac.push(per.lista))
    let listaDeVacunas = nombreVac.join(',').split(',')
    let listaFiltrada = listaDeVacunas.filter((el, index) => listaDeVacunas.indexOf(el) === index)
   
    return (
        <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Editar usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} controlId="exampleForm.ControlSelect1">
                        <Form.Label column sm={2}>
                        Vacuna:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control as={`select`} placeholder="Vacuna" onChange={handleChangeVacuna}>
                                    {listaFiltrada.map((vac) =>
                                    <option key={vac}>{vac}</option>
                                    )}
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalDate">
                        <Form.Label column>
                        Fecha:
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control type="date" onChange={handleChangeFecha} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalLugar">
                        <Form.Label column sm={2}>
                        Lugar:
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control type="text" placeholder="Lugar" onChange={handleChangeLugar} />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleSaveChanges}>
                    Guardar evento
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalEvento