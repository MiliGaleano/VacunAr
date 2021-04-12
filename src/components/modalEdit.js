import React, { useEffect, useState, useContext } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import bsCustomFileInput from 'bs-custom-file-input'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import firebase from 'firebase/app'
import "firebase/storage"
import "firebase/firestore"
import {Auth} from '../context/authContext'
import {UserData} from '../context/userContext'

const ModalEdit = ({handleClose, showModal, newUser, unombre, handleChangesMade}) => {

    const [nombre, setNombre] = useState()
    const [fecha, setFecha] = useState()
    const [imageAsFile, setImageAsFile] = useState('')

    useEffect(()=>{
        !newUser && setNombre(unombre)
    },[])

    const storage = firebase.storage()
    const db = firebase.firestore()
    const { user } = useContext(Auth)
    const usermail = user.email

    const {handleUpdateUser} = useContext(UserData)

    const handleChangeNombre = (evt) => {
        setNombre(evt.target.value)
    }

    const handleChangeFecha = (evt) => {
        setFecha(evt.target.value)
    }

    const handleChangeFoto = (evt) => {
        const image = evt.target.files[0]
        setImageAsFile(imageFile => (image))
    }

    const handleSaveChanges = (e) => {
        e.preventDefault()

    if (newUser) {
        db.collection("users").doc(usermail).collection('datauser').where('__name__',"==",nombre).get()
        .then((query) => {  
            const vacUser = query.docs[0]
            if (vacUser === undefined) {
                if(imageAsFile === '' ) {
                    console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
                }
                const uploadTask = storage.ref(`/images/${usermail+nombre}`).put(imageAsFile)

                db.collection("users").doc(usermail).collection('datauser').doc(nombre).set({
                    nombre: nombre,
                    fecha: fecha,
                    url: usermail+nombre
                })
                .then(() => {
                    console.log('changes saved');
                    handleUpdateUser()
                    handleChangesMade()
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                })
            } else {alert('Ya existe un usuario con ese nombre')}
        })
    } else {
            if(imageAsFile === '' ) {
                console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
            }
            const uploadTask = storage.ref(`/images/${usermail+nombre}`).put(imageAsFile)

            db.collection("users").doc(usermail).collection('datauser').doc(nombre).set({
                nombre: nombre,
                fecha: fecha,
                url: usermail+nombre
            })
            .then(() => {
                console.log('changes saved');
                handleUpdateUser()
                handleChangesMade()
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            })
        }

        handleClose()
    }

    useEffect(()=>{
        bsCustomFileInput.init()
    }, [])

    return (
        <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Editar usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} controlId="formHorizontalNombre">
                        <Form.Label column sm={2}>
                        Nombre:
                        </Form.Label>
                        <Col sm={10}>
                            { newUser ? 
                            <Form.Control type="text" placeholder="Nombre" onChange={handleChangeNombre} />
                            : <Form.Control plaintext readOnly defaultValue={nombre} />
                            }
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalDate">
                        <Form.Label column>
                        Fecha de nacimiento:
                        </Form.Label>
                        <Col sm={7}>
                        <Form.Control type="date" onChange={handleChangeFecha} />
                        </Col>
                    </Form.Group>

                    <Form.Group>
                        <Form.File id="exampleFormControlFile1" onChange={handleChangeFoto} label="Sube una foto" lang="es" data-browse="Buscar" custom />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleSaveChanges}>
                    Guardar cambios
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalEdit