import React from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

const CardProximas = ({nombre,handleShow,proxVacs}) => {

    return(
        <Card className="text-center">
            <Card.Header>{nombre}</Card.Header>
            <Card.Body>
                <Card.Title>Próximas vacunas</Card.Title>
                <ListGroup variant="flush">
                    <ListGroup.Item style={{display:'flex', flexWrap:'wrap', justifyContent:'space-between'}}>
                        <h5 style={{fontSize:'0.9rem', color:'blue'}}>Vacuna</h5>
                        <h5 style={{fontSize:'0.9rem', color:'blue'}}>Fecha estimada</h5>
                    </ListGroup.Item>
                    {proxVacs[0][0].lista.map((prox) =>
                    <ListGroup.Item key={proxVacs[0][0].id+prox} style={{display:'flex', justifyContent:'space-between', fontSize:'0.9rem'}}>
                        <p>{prox}</p>
                        <p>{proxVacs[1]}</p>
                    </ListGroup.Item>
                    )}
                </ListGroup>
            </Card.Body>
            <Card.Footer className="text-muted"><Button variant="primary" onClick={handleShow} >Crear evento</Button></Card.Footer>
        </Card>
    )
}

export default CardProximas