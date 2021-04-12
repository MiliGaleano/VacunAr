import React, {useState, useEffect, useContext} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'
import { Link, NavLink, useHistory } from 'react-router-dom'
import app from '../config/config'
import {UserData} from '../context/userContext'
import {Auth} from '../context/authContext'
import ComponenteImprimir from './componenteImprimir'
import GetImprimir from '../services/getImprimir'
import Loading from './loading'

const Header = ({title}) => {

    const [isDesktop, setDesktop] = useState(window.innerWidth > 700)
    const {userData, handleUpdateActive} = useContext(UserData)
    const [loading, setLoading] = useState(true)
    const [datosImprimir, setDatosImprimir] = useState()
    let lista = JSON.parse(sessionStorage.getItem('listaVacunas'))
    const { user } = useContext(Auth)
    let usermail = user.email
    let userActive = userData.filter((x)=> x.active === true)
    let nombre = userData.length !== 0 ? userActive[0].nombre : null
    
    const updateMedia = () => {
      setDesktop(window.innerWidth > 700)
  }
  
  useEffect(() => {
    window.addEventListener("resize", updateMedia)
    return () => window.removeEventListener("resize", updateMedia)
  })

  useEffect(() => {
    if (userData.length !== 0) {
      (async function() {
          let res = await GetImprimir(lista, usermail, nombre)
          setDatosImprimir(res)
          setLoading(false)
      })()
    } else {
      setLoading(false)
    }
}, [user, userData, nombre])


const handleChangeActive = (x) => {
  handleUpdateActive(x)
  setDatosImprimir()
  setLoading(true)
}

let history = useHistory()
const handleLogOut = () => {
  app.auth().signOut()
  history.push("/login")
}

  if (loading) return <Loading></Loading>
    else return (
        <Navbar collapseOnSelect style={{backgroundColor: "#7596b6"}}>
              <Nav className="mr-auto">
                <NavDropdown title={title} id="collasible-nav-dropdown">
                  {userData.map((user) => 
                    user.active ? <NavDropdown.Item key={user.url} active>{user.nombre}</NavDropdown.Item>
                    : <NavDropdown.Item key={user.url} onClick={() => handleChangeActive(user.nombre)}>{user.nombre}</NavDropdown.Item>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link to={{pathname: '/edit', search: 'new'}} style={{textDecoration: 'none', color: '#212529'}}>Nueva libreta</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  {datosImprimir && <ComponenteImprimir datosImprimir={datosImprimir} lista={lista} nombre={nombre}></ComponenteImprimir>}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogOut}>Cerrar sesión</NavDropdown.Item>
                </NavDropdown>
              </Nav>
          {isDesktop &&
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"></Nav>
                <Nav>
                  <Nav.Link as={NavLink} to="/misVacunas">Mis Vacunas</Nav.Link>
                  <Nav.Link as={NavLink} to="/calendario">Calendario</Nav.Link>
                  <Nav.Link as={NavLink} to="/noticias">Novedades</Nav.Link>
                  <Nav.Link as={NavLink} to="/mapa">Mapa</Nav.Link>
                </Nav>
            </Navbar.Collapse>
              }
        </Navbar>
    )
}

export default Header