import React from 'react'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import CardAcordeonDatos from './cardAcordeonDatos'
import CardAcordeonEdit from './cardAcordeonEdit'

const Acordeon = ({edit, nombre, usermail, style, newUser}) => {

    let lista = JSON.parse(sessionStorage.getItem('listaVacunas'))

    const styleBottom = style ? {marginBottom:'2rem'} : {marginBottom:'4rem'}

    return(
        !newUser &&
        <Accordion style={styleBottom}>
            {lista.map((per) => 
                <Card key={per.id}>
                    <Accordion.Toggle as={Card.Header} eventKey={per.id} style={{backgroundColor:'white',cursor:'pointer', color:'rgb(44, 73, 170)', fontSize:'1.5rem'}}>
                    {per.periodo}
                    </Accordion.Toggle>
                    {per.lista.map((vac) => 
                        <Accordion.Collapse eventKey={per.id} key={per.id+vac}>
                        {edit ?   
                            <CardAcordeonEdit vac={vac} per={per.id} nombre={nombre} usermail={usermail} newUser={newUser} />
                            :<CardAcordeonDatos vac={vac} per={per.id} nombre={nombre} usermail={usermail} />
                            }
                        </Accordion.Collapse>
                    )}
                </Card>
            )}
        </Accordion>
    )
}

export default Acordeon