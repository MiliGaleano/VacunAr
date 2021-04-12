import React, {useState,useEffect} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyringe } from '@fortawesome/free-solid-svg-icons'
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons'
import { faBullhorn } from '@fortawesome/free-solid-svg-icons'
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {

    const [isDesktop, setDesktop] = useState(window.innerWidth > 700)

    const updateMedia = () => {
      setDesktop(window.innerWidth > 700)
  }
  
  useEffect(() => {
    window.addEventListener("resize", updateMedia)
    return () => window.removeEventListener("resize", updateMedia)
  })

  if (!isDesktop) {
    return (
        <Navbar style={{backgroundColor: "#7596b6"}} fixed='bottom' className="justify-content-around">
            <Nav>
                <Nav.Link as={Link} to="/misVacunas">
                    <FontAwesomeIcon icon={faSyringe}/>
                </Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link as={Link} to="/calendario">
                    <FontAwesomeIcon icon={faCalendarAlt}/>
                </Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link as={Link} to="/noticias">
                    <FontAwesomeIcon icon={faBullhorn}/>
                </Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link as={Link} to="/mapa">
                    <FontAwesomeIcon icon={faMapMarkedAlt}/>
                </Nav.Link>
            </Nav>
          </Navbar>
        ) 
    } else return null 
}

export default Footer