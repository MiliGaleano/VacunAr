import React, { useEffect, useState, useContext } from 'react'
import Acordeon from '../components/acordeon'
import DatosUser from '../components/datosUser'
import Header from '../components/header'
import Footer from '../components/footer'
import {Auth} from '../context/authContext'
import {UserData} from '../context/userContext'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import Loading from '../components/loading'

const ListaVacunas = () => {

    const { user } = useContext(Auth)
    const {userData} = useContext(UserData)
    let usermail = user.email
    let userActive
    let nombre
    if (userData !== null){
    userActive = userData.filter((x)=> x.active === true)
    nombre = userData.length !== 0 ? userActive[0].nombre : null
    }

    const [isDesktop, setDesktop] = useState(window.innerWidth > 700)
    const updateMedia = () => {
        setDesktop(window.innerWidth > 700)
    }
    
    useEffect(() => {
        window.addEventListener("resize", updateMedia)
        return () => window.removeEventListener("resize", updateMedia)
    })

    const classEditButton = isDesktop ? {position:'fixed',top:'85vh', right:'5%', fontSize:'3rem', zIndex:'100',cursor:'pointer', color: "#7596b6"} : {position:'fixed',top:'82vh', right:'10%', fontSize:'2rem', zIndex:'100',cursor:'pointer', color: "#7596b6"}

    return( 
        userData ?
            <div>
                <Header title='Mis Vacunas'></Header>
                {nombre!== null ? <DatosUser nombre={nombre} usermail={usermail}></DatosUser>
                : <DatosUser usermail={user.email}></DatosUser>
                }
                {nombre!== null ? <Link to='/edit'><FontAwesomeIcon icon={faPencilAlt} style={classEditButton}/></Link>
                : <Link to={{pathname: '/edit', search: 'new'}}><FontAwesomeIcon icon={faUserPlus} style={classEditButton}/></Link>
                }
                <Acordeon nombre={nombre} usermail={usermail} style={isDesktop}></Acordeon>
                <Footer /> 
            </div>
        :   <Loading></Loading>
    )
}

export default ListaVacunas