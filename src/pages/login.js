import React, {useState, useContext, useEffect} from 'react'
import app from '../config/config'
import 'firebase/auth'
import imgVacunar from '../assets/vacunar2.png'
import { Auth } from '../context/authContext'
import { useHistory } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function Login() {
    const { user } = useContext(Auth)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    let history = useHistory()
    useEffect(() => {
        if (user) {
            history.push("/misVacunas");
        }
    }, [history, user]);

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const signUpSubmit = async () => {
        await app.auth().createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
            let errorCode = error.code
            let errorMessage = error.message

            if (errorCode === 'auth/weak-password') {
              alert('La contraseña no es lo suficientemente fuerte, inténtelo de nuevo.')
            } else {
              alert(errorMessage)
            }
        })
    }

    const LoginSubmit = async () => {
        await app.auth().signInWithEmailAndPassword(email, password)
        .catch(function(error) {
            let errorCode = error.code
            let errorMessage = error.message

            if (errorCode === 'auth/wrong-password') {
            alert('Contraseña incorrecta, inténtelo de nuevo.')
            } else if (errorCode === 'auth/invalid-email') {
            alert('El email ingresado no es válido, inténtelo de nuevo.\n(Ej: vacunar@react.com)')
            } else if (errorCode === 'auth/user-not-found') {
            alert('No existe usuario registrado con ese email, inténtelo de nuevo.')
            } else {
                alert(errorMessage)
            }
        })
    }

    const ResetPassword = async () => {
        await app.auth().sendPasswordResetEmail(email).then(function() {
            alert('Se le ha enviado un email para recuperar su contraseña.')
          }).catch(function(error) {
            let errorCode = error.code
            let errorMessage = error.message

            if (errorCode === 'auth/invalid-email') {
              alert(errorMessage)
            } else if (errorCode === 'auth/user-not-found') {
              alert(errorMessage)
            }
        })
    }

    const [isDesktop, setDesktop] = useState(window.innerWidth > 700)

    const updateMedia = () => {
      setDesktop(window.innerWidth > 700)
  }
  
  useEffect(() => {
    window.addEventListener("resize", updateMedia)
    return () => window.removeEventListener("resize", updateMedia)
  })

    const styleImg= isDesktop ? {width:'300px', marginRight:'5em'} : {width:'60vw', marginTop:'2em'}
    const width= isDesktop ? {width:'500px'} : {width:'80vw', textAlign:'center'}

    return (
        <div style={{width:'100vw', minHeight:'100vh', backgroundColor: "#7596b6", display:'flex', flexWrap:'wrap',justifyContent:'center', alignItems:'center'}}>
            <img src={imgVacunar} alt="logo Vacunar" style={styleImg}/>
            <div style={width}>
                <h1 style={{color:'#efefef'}}>VacunAr</h1>
                <p>Complete email y contraseña para ingresar o crear una nueva cuenta</p>
                <Form style={width}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" onChange={handleEmail} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Contraseña:</Form.Label>
                        <Form.Control type="password" onChange={handlePassword} />
                    </Form.Group>
                    <Form.Group>
                    <Button variant="light" onClick={signUpSubmit} style={{marginRight:'2em'}}>
                        Registrarse
                    </Button>
                    <Button variant="light" onClick={LoginSubmit}>
                        Ingresar
                    </Button>
                    </Form.Group>
                    <Form.Group>
                        <h5 onClick={ResetPassword} style={{color:'#efefef', fontSize:'1em', cursor:'pointer'}}>Olvidé mi contraseña</h5>
                    </Form.Group>
                </Form>
            </div>
    </div>
    )
}