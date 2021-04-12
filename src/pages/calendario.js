import React, {useContext, useState, useEffect} from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import {Auth} from '../context/authContext'
import {UserData} from '../context/userContext'
import ModalEvento from '../components/modalEvento'
import firebase from 'firebase/app'
import "firebase/firestore"
import CardProximas from '../components/cardProximas'
import CardEventos from '../components/cardEventos'
import GetEventos from '../services/getEventos'
import GetProximasVacunas from '../services/getProximasVacunas'
import Loading from '../components/loading'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

const Calendario = () => {
    const { user } = useContext(Auth)
    const {userData} = useContext(UserData)
    let usermail = user.email
    let userActive = userData.filter((x)=> x.active === true)
    let nombre = userData.length !== 0 ? userActive[0].nombre : null
    let fechaNac = userData.length !== 0 ? userActive[0].fecha : null

    const [eventos, setEventos] = useState([])
    const [loading, setLoading] = useState(true)
    const [actualizarEvento, setActualizarEvento] = useState(0)
    const [proxVacs, setProxVacs] = useState()

    const [vacuna, setVacuna] = useState('')
    const [fecha, setFecha] = useState()
    const [lugar, setLugar] = useState('')
    const [showModal, setShowModal] = useState(false)

    const handleClose = () => setShowModal(false)
    const handleShow = () => setShowModal(true)
    const db = firebase.firestore()

    const [isDesktop, setDesktop] = useState(window.innerWidth > 700)
    const updateMedia = () => {
        setDesktop(window.innerWidth > 700)
    }
    
    useEffect(() => {
        window.addEventListener("resize", updateMedia)
        return () => window.removeEventListener("resize", updateMedia)
    })

    useEffect(()=>{
    if (nombre) {
      let res=  GetProximasVacunas(usermail,nombre,fechaNac)
      setProxVacs(res)
    }
    }, [nombre])

    useEffect(() => {
    if (nombre) {
     GetEventos(usermail,nombre)
        .then((res) => {
            setEventos(res)
            setLoading(false)
        })
        .catch((err) => {
            setLoading(false)
            console.log(err)
        }) 
    } else {
        setLoading(false)
    }
    }, [actualizarEvento, nombre])

    const handleChangeVacuna = (evt) => {
        setVacuna(evt.target.value)
    }

    const handleChangeFecha = (evt) => {
        setFecha(evt.target.value)
    }

    const handleChangeLugar = (evt) => {
        setLugar(evt.target.value)
    }

    const handleSaveChanges = (e) => {
        e.preventDefault()

        db.collection("users").doc(usermail).collection('datauser').doc(nombre).collection('eventos').add({
            vacuna: vacuna,
            fecha: fecha,
            lugar: lugar
        })
        .then(() => {
            console.log('changes saved');
            handleActEvento()
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        })

        handleClose()
    }

    const handleActEvento = () => {
        setActualizarEvento(actualizarEvento => actualizarEvento + 1)
    }

    if (loading) return <Loading></Loading>
    else return (
        <div>
            {showModal && <ModalEvento handleClose={handleClose} showModal={showModal} handleChangeVacuna={handleChangeVacuna} handleChangeFecha={handleChangeFecha} handleChangeLugar={handleChangeLugar} handleSaveChanges={handleSaveChanges}  />}
            <Header title='Calendario'></Header>
            { nombre ?
                <>
                    <CardProximas handleShow={handleShow} nombre={nombre} proxVacs={proxVacs}></CardProximas>
                    <CardEventos nombre={nombre} usermail={usermail} isDesktop={isDesktop} eventos={eventos} handleActEvento={handleActEvento}></CardEventos>
                </>
            :   <Jumbotron>
                    <h1>Calendario</h1>
                    <p>
                        Parece que todavía no se ha creado ningún usuario.<br></br> 
                        Crea uno y completa sus datos para poder ver las próximas vacunas que debe colocarse!
                    </p>
                    <p>
                        <Button variant="primary"><Link to={{pathname: '/edit', search: 'new'}} style={{textDecoration: 'none', color: 'white'}}>Crear Usuario</Link></Button>
                    </p>
                </Jumbotron>
            }
            <Footer /> 
        </div>
    )
}

export default Calendario