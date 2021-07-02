import React, {useState,useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import firebase from 'firebase/app'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown } from '@fortawesome/free-solid-svg-icons'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Loading from './loading'

const CardAcordeonEdit = ({vac, per, nombre, usermail, newUser}) => {

    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState({
                                    lugar: '',
                                    fecha: ''
                                    })
    const [noData, setNoData] = useState(false)
    const [newDataUser, setNewDataUser] = useState({
                                            lugar: '',
                                            fecha: ''
                                            })
    const [newChanges, setNewChanges] = useState(false)
    const [isDesktop, setDesktop] = useState(window.innerWidth > 700)
    const db = firebase.firestore()

    const updateMedia = () => {
      setDesktop(window.innerWidth > 700)
    }
  
        useEffect(() => {
            window.addEventListener("resize", updateMedia)
            return () => window.removeEventListener("resize", updateMedia)
        })

        useEffect(()=>{
            setLoading(true)
            if (nombre) {
                db.collection("users").doc(usermail).collection('datauser').doc(nombre).collection('listaVacunas').doc(per).collection(vac).where('__name__',"==",vac).get()
                .then((query) => {  
                    const vacUser = query.docs[0]
                    if (vacUser !== undefined) {
                        const {lugar, fecha} = vacUser.data()
                        setUserData({
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

        const handleNewFecha = (e) => {
            setNewDataUser( newDataUser => ({ ...newDataUser, fecha: e.target.value }) )
        }

        const handleNewLugar = (e) => {
            setNewDataUser( newDataUser => ({ ...newDataUser, lugar: e.target.value }) )
        }

        const handleUpdateVacuna = (e) => {
            e.preventDefault()
            if (newDataUser.fecha === '' || newDataUser.lugar === ''){
                alert('Complete todos los campos')
            } else {
                db.collection("users").doc(usermail).collection('datauser').doc(nombre).collection('listaVacunas').doc(per).collection(vac).doc(vac).set({
                    lugar: newDataUser.lugar,
                    fecha: newDataUser.fecha
                })
                .then(() => {
                    console.log('changes saved');
                    // setNoData(false)
                    setNewChanges(true)
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                })
            }
        }

        const styleInput = isDesktop ? {width:'30vw', marginBottom:'0'} : {width:'70vw', marginBottom:'0'}
        const styleIcon = isDesktop ? {margin:'0 0 1em 10em', cursor:'pointer'} : {margin:'0 0 0em 2em', cursor:'pointer'}

        return (
            loading ? <Loading></Loading>
            : !newUser &&
            <Card.Body style={{padding:'0', backgroundColor:'rgb(188 253 218)', border:'none', fontSize:'1rem',fontWeight:'500', color:'rgb(44, 73, 170)'}}>
                <Accordion>
                    <Card style={{backgroundColor:'rgb(188 253 218)', border:'none'}}>
                        <Accordion.Toggle as={Card.Header} eventKey={vac+per} style={{backgroundColor:'transparent', border:'none', cursor:'pointer'}}>
                            <div style={{display:'flex', flexWrap:'wrap', width:'90vw', justifyContent:'space-between'}}>
                                <p style={{marginBottom:'0'}}>{vac}</p>
                                <FontAwesomeIcon icon={faSortDown}/>
                            </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={vac+per}>
                            <Card.Body style={{padding:'0rem 1.25rem'}}>
                                <div style={{display:'flex', flexWrap:'wrap', width:'90vw', justifyContent:'flex-start', alignItems:'center'}} className='cardVacOpen'>
                                    <Form style={styleInput}>
                                        <Form.Group as={Row} controlId="formHorizontalFecha">
                                            <Form.Label column >
                                            Fecha:
                                            </Form.Label>
                                            <Col sm={10}>
                                            <Form.Control type="date" value={newDataUser.fecha ? newDataUser.fecha : !noData ? userData.fecha : ''} onChange={handleNewFecha} />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formHorizontalLugar">
                                            <Form.Label column >
                                            Lugar:
                                            </Form.Label>
                                            <Col sm={10}>
                                            <Form.Control type="text" placeholder={noData ? 'Lugar' : userData.lugar} onChange={handleNewLugar} />
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                    {!noData || newChanges ? <FontAwesomeIcon icon={faPencilAlt} style={styleIcon} onClick={handleUpdateVacuna} />
                                    : <FontAwesomeIcon icon={faCheckCircle} style={styleIcon} onClick={handleUpdateVacuna} />
                                    }
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion> 
            </Card.Body>
    )
}

export default CardAcordeonEdit