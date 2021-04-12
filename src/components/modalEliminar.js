import React, { useContext } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import firebase from 'firebase/app'
import "firebase/storage"
import "firebase/firestore"
import {UserData} from '../context/userContext'

const ModalEliminar = ({handleCloseEliminar, modalEliminar, nombre, usermail}) => {

    const {handleUpdateUser} = useContext(UserData)
    const db = firebase.firestore()
    const storage = firebase.storage()
    let lista = JSON.parse(sessionStorage.getItem('listaVacunas'))

    const handleSaveChanges = () => {
        
        lista.map((item) => 
            item.lista.map((vac) =>
                db.collection("users").doc(usermail).collection('datauser').doc(nombre).collection('listaVacunas').doc(item.id).collection(vac).doc(vac).delete()
            )
        )

        db.collection("users").doc(usermail).collection('datauser').doc(nombre).delete()
        .then(() => {
            console.log('changes saved');
            storage.refFromURL(`gs://vacunas-e10b0.appspot.com/images/${usermail}${nombre}`).delete()
            .then(() => {
                console.log('Storage modificado correctamente')
            })
            .catch((error) => {
                console.log(error)
            })
            handleUpdateUser()
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
                <Modal.Title>Eliminar usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {`Si presiona aceptar el usuario '${nombre}' será eliminado y los datos no podrán ser recuperados`}
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

export default ModalEliminar