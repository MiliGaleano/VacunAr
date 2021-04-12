import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import firebase from 'firebase/app'
import "firebase/storage"
import "firebase/firestore"

const EliminarEvento = ({handleCloseEliminar, modalEliminar, nombre, usermail, eventoID, handleActEvento}) => {

    const db = firebase.firestore()

    const handleSaveChanges = () => {
        db.collection("users").doc(usermail).collection('datauser').doc(nombre).collection('eventos').doc(eventoID).delete()
        .then(() => {
            console.log('changes saved');
            handleActEvento()
        })
        .catch((error) => {
            console.error("Error removing document: ", error);
            alert('Algo falló, inténtelo nuevamente')
        })
        handleCloseEliminar()
    }

    return (
        <Modal show={modalEliminar} onHide={handleCloseEliminar} centered>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar evento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Si presiona aceptar este evento será eliminado y los datos no podrán ser recuperados.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEliminar}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSaveChanges}>
                    Aceptar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EliminarEvento