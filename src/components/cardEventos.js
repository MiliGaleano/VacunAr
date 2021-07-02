import React, {useState} from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import GoogleCalendar from '../assets/googleCalendar.png'
import EliminarEvento from './eliminarEvento'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import ModalGoogleCalendar from './modalGoogleCalendar'

const CardEventos = ({nombre,usermail,isDesktop,eventos,handleActEvento}) => {

    const [modalEliminar, setModalEliminar] = useState(false)
    const [IDaEliminar, setIDaEliminar] = useState('')
    const [eventCalendar, setEventCalendar] = useState()

    const handleOpenEliminar = (x) => { 
        setIDaEliminar(x)
        setModalEliminar(true) 
    }
    const handleCloseEliminar = () => { setModalEliminar(false) }

    const [modalGoogle, setModalGoogle] = useState(false)
    const handleOpenGoogle = (x) => { 
        setEventCalendar(x)
        setModalGoogle(true) 
    }
    const handleCloseGoogle = () => { setModalGoogle(false) }

    let styleWidth = isDesktop ? '30vw' : '100vw'
    let styleCenterh4 = isDesktop ? 'left' : 'center'
    let styleCenterdiv = isDesktop ? 'flex-end' : 'center'
    let styleMarginBottom = isDesktop ? '0rem' : '0.6rem'

    return(
        <Card className="text-center" style={{marginTop:'2rem', marginBottom:'3rem'}}>
            <Card.Body>
                <Card.Title>Próximos Eventos</Card.Title>
                { eventos.map((evento) => 
                <ListGroup variant="flush" key={evento.id}>
                {modalGoogle && <ModalGoogleCalendar modalGoogle={modalGoogle} handleCloseGoogle={handleCloseGoogle} evento={eventCalendar} nombre={nombre} usermail={usermail}></ModalGoogleCalendar>}
                {modalEliminar && <EliminarEvento modalEliminar={modalEliminar} handleCloseEliminar={handleCloseEliminar} eventoID={IDaEliminar} nombre={nombre} usermail={usermail} handleActEvento={handleActEvento}></EliminarEvento>}
                    <ListGroup.Item style={{display:'flex', flexWrap:'wrap', justifyContent:'space-between', fontSize:'0.9rem', alignItems:'center'}}>
                        <h4 style={{width:`${styleWidth}`, minWidth:'200px', textAlign:`${styleCenterh4}`, marginBottom:`${styleMarginBottom}`, fontSize:'0.9rem'}}>{evento.vacuna}</h4>
                        <div style={{width:`${styleWidth}`, minWidth:'200px', display:'flex', justifyContent:'space-between', marginBottom:`${styleMarginBottom}`}}>
                            <p style={{marginBottom:'0'}}>{evento.lugar}</p>
                            <p style={{marginBottom:'0'}}>{evento.fecha}</p>
                        </div>
                        <div style={{ width:`${styleWidth}`, minWidth:'200px', display:'flex', alignItems:'center', justifyContent:`${styleCenterdiv}`}}>
                            { usermail.includes('gmail') 
                            ? <img src={GoogleCalendar} onClick={()=> handleOpenGoogle(evento)} alt='Calendario Google' style={{width:'1.2rem', height:'1.2rem', cursor: 'pointer'}}></img>
                            : null
                            }
                            <FontAwesomeIcon onClick={()=> handleOpenEliminar(evento.id)} icon={faTrash} style={{fontSize:'1.2rem', marginLeft:'1rem', color: "#7596b6", cursor: 'pointer'}}/>
                        </div>
                    </ListGroup.Item>
                </ListGroup>  
                )}     
            </Card.Body>
        </Card>
    )
}

export default CardEventos