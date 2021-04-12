import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import CalendarioGoogle from '../components/calendarioGoogle'

const ModalGoogleCalendar = ({handleCloseGoogle,modalGoogle,nombre,usermail,evento}) => {

    const{vacuna,lugar,fecha} = evento
    return (
        <Modal show={modalGoogle} onHide={handleCloseGoogle} centered>
            <Modal.Header closeButton>
                <Modal.Title>Google Calendar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Agendar este evento en mi calendario de Google
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseGoogle}>
                    Cancelar
                </Button>
                <CalendarioGoogle handleCloseGoogle={handleCloseGoogle} nombre={nombre} usermail={usermail} vacuna={vacuna} lugar={lugar} fecha={fecha}></CalendarioGoogle>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalGoogleCalendar