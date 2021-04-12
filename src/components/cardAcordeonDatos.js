import React, {useState,useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import firebase from 'firebase/app'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown } from '@fortawesome/free-solid-svg-icons'
import Loading from './loading'

const CardAcordeonDatos = ({vac, per, nombre, usermail}) => {

    const [loading, setLoading] = useState(false)
    const [userDataDb, setuserDataDb] = useState({
                                    lugar: '',
                                    fecha: ''
                                    })
    const [noData, setNoData] = useState()
    const db = firebase.firestore()

        useEffect(()=>{
            setNoData(false)
            setLoading(true)
            if (nombre) {
                db.collection("users").doc(usermail).collection('datauser').doc(nombre).collection('listaVacunas').doc(per).collection(vac).where('__name__',"==",vac).get()
                .then((query) => {  
                    const vacUser = query.docs[0]
                    if (vacUser !== undefined) {
                        const {lugar, fecha} = vacUser.data()
                        setuserDataDb({
                            lugar: lugar,
                            fecha: fecha
                            })
                        setLoading(false)
                    } else{
                        setNoData(true)
                        setLoading(false)
                    }
                })
                .catch((err) => console.log(err))
            } else {setNoData(true)
            setLoading(false)}
        }, [nombre])

        return (
            loading ? <Loading></Loading>
            :
            noData ? <Card.Body style={{padding:'0.75rem 1.25rem', backgroundColor:'rgb(188 253 218)', border:'none', fontSize:'1rem',fontWeight:'500', color:'rgb(44, 73, 170)'}}>{vac}</Card.Body>
            :
            <Card.Body style={{padding:'0', backgroundColor:'rgb(188 253 218)', border:'none', fontSize:'1rem',fontWeight:'500', color:'rgb(44, 73, 170)'}}>
                <Accordion>
                    <Card style={{backgroundColor:'rgb(188 253 218)', border:'none'}}>
                        <Accordion.Toggle as={Card.Header} eventKey={vac+userDataDb.lugar} style={{backgroundColor:'transparent', border:'none', cursor:'pointer'}}>
                            <div style={{display:'flex', flexWrap:'wrap', width:'90vw', justifyContent:'space-between'}}>
                                <p style={{marginBottom:'0'}}>{vac}</p>
                                <FontAwesomeIcon icon={faSortDown}/>
                            </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={vac+userDataDb.lugar}>
                            <Card.Body style={{padding:'0rem 1.25rem'}}>
                                <div style={{display:'flex', flexWrap:'wrap', width:'90vw', justifyContent:'space-between', marginBottom:'0.3em'}} className='cardVacOpen'>
                                    <p style={{width:'30vw', marginBottom:'0'}}>{userDataDb.fecha}</p>
                                    <p style={{marginBottom:'0'}}>{userDataDb.lugar}</p>
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion> 
            </Card.Body>
    )
}

export default CardAcordeonDatos