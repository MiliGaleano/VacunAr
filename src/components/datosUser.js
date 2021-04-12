import React, { useState,useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import firebase from 'firebase/app'
import "firebase/storage"
import Loading from './loading'

const DatosUser = ({edit, handleShow, nombre, usermail, changeMade }) => {

    const [loading, setLoading] = useState(false)
    const [urlFoto, setUrlFoto] = useState('')
    const storage = firebase.storage()

    useEffect(()=>{
        setLoading(true)
        if (nombre) {
            storage.refFromURL(`gs://vacunas-e10b0.appspot.com/images/${usermail}${nombre}`).getDownloadURL()
            .then((url) => {
                setUrlFoto(url)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
            })
        } else {
            setLoading(false)
        }
    }, [nombre, changeMade])


    return (
        loading ? <Loading></Loading>
        :
        <Card style={{ width: '100%', display:'block', textAlign:'center', border:'none', marginTop:'2em'}} className="text-center">
        {nombre ? <Image roundedCircle
                src={urlFoto} 
                style={{ width: '150px', height:'150px', objectFit: 'cover'}}/> 
        :
        <FontAwesomeIcon icon={faUserCircle} style={{ width: '92vw', fontSize:'150px'}}/>
        }
            <Card.Body style={{padding:'1.25rem 0 1.25rem 0'}}>
                <Card.Title style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
                    <h2>{nombre ? nombre : 'User'}</h2>
                    {edit && <FontAwesomeIcon icon={faPencilAlt} onClick={handleShow} style={{margin:'0 0 0.2em 1em', cursor:'pointer'}}/>}
                </Card.Title>
            </Card.Body>
        </Card>
    )
}

export default DatosUser