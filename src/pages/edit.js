import React, {useState, useContext, useEffect} from 'react'
import Acordeon from '../components/acordeon'
import DatosUser from '../components/datosUser'
import Header from '../components/header'
import Footer from '../components/footer'
import ModalEdit from '../components/modalEdit'
import ModalEliminar from '../components/modalEliminar'
import {Auth} from '../context/authContext'
import {UserData} from '../context/userContext'
import Button from 'react-bootstrap/Button'
import {useLocation} from "react-router-dom";

const Edit = () => {

    const [showModal, setShowModal] = useState(false)
    const [modalEliminar, setModalEliminar] = useState(false)
    const [changeMade, setChangeMade] = useState(false)

    const handleClose = () => setShowModal(false)
    const handleShow = () => setShowModal(true)
    const handleCloseEliminar = () => setModalEliminar(false)
    const handleChangesMade = () => setChangeMade(!changeMade)

    useEffect(()=>{
        window.scrollTo(0, 0)
    })

    const { user } = useContext(Auth)
    const usermail = user.email
    const {userData} = useContext(UserData)
    const userActive = userData.filter((x)=> x.active === true)
    const nombre = userData.length !== 0 ? userActive[0].nombre : null

    const vacunas = JSON.parse(sessionStorage.getItem('listaVacunas'))
    let location = useLocation()
    let newUser = false
    if (location.search === '?new') {
        newUser = true
    }

    return (
        <div>
            {showModal && <ModalEdit handleClose={handleClose} showModal={showModal} newUser={newUser} unombre={nombre} handleChangesMade={handleChangesMade} />}
            {modalEliminar && <ModalEliminar nombre={nombre} usermail={usermail} handleCloseEliminar={handleCloseEliminar} modalEliminar={modalEliminar} />}
            <Header title='Mis Vacunas'></Header>
            {newUser ? <DatosUser edit={true} usermail={usermail} handleShow={handleShow} changeMade={changeMade} />
            : <DatosUser edit={true} nombre={nombre} usermail={usermail} handleShow={handleShow} changeMade={changeMade} />
            }
            {vacunas && <Acordeon nombre={nombre} usermail={usermail} edit={true} newUser={newUser}></Acordeon>}
            {!newUser && <div style={{display:'flex', justifyContent:'center', width:'100%', margin:'2rem 0 5rem'}}><Button onClick={()=> setModalEliminar(true)}>Eliminar Usuario</Button></div>}
            <Footer /> 
        </div>
    )
}

export default Edit