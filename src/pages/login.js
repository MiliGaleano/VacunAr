import React, {useState, useContext, useEffect} from 'react'
import app from '../config/config'
import 'firebase/auth'
import imgVacunar from '../assets/vacunar2.png'
import { Auth } from '../context/authContext'
import { useHistory } from "react-router-dom"
import ModalError from '../components/modalError'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Formik } from 'formik'
import * as yup from 'yup'

// validations
    const initialValues = {
        email: "",
        password: ""
    }

    const validationSchema = yup.object().shape({
        email: yup.string()
            .email('Ingresa un email válido')
            .required('Ingresa un email'),
        password: yup.string()
            .min(4, 'Debe tener más de 4 caracteres')
            .max(12, 'Debe tener menos de 12 caracteres')
            .required('Ingresa una contraseña'),
      })

export default function Login() {
    const { user } = useContext(Auth)
    const [showModal, setShowModal] = useState(false)
    const [message, setMessage] = useState('')
    
    let history = useHistory()
    useEffect(() => {
        if (user) {
            history.push("/misVacunas");
        }
    }, [history, user]);

    const signUpSubmit = async (values) => {
        await app.auth().createUserWithEmailAndPassword(values.email, values.password)
        .catch(function(error) {
            let errorCode = error.code
            let errorMessage = error.message

            if (errorCode === 'auth/weak-password') {
                setMessage('La contraseña no es lo suficientemente fuerte, inténtelo de nuevo.')
                setShowModal(true)
            } else if (errorCode === 'auth/email-already-in-use') {
                setMessage('Ya existe un usuario registrado con ese email')
                setShowModal(true)
            } else {
                setMessage(errorMessage)
                setShowModal(true)
            }
        })
    }

    const LoginSubmit = async (values) => {
        await app.auth().signInWithEmailAndPassword(values.email, values.password)
        .catch(function(error) {
            let errorCode = error.code
            let errorMessage = error.message

            if (errorCode === 'auth/wrong-password') {
                setMessage('Contraseña incorrecta, inténtelo de nuevo.')
                setShowModal(true)
            } else if (errorCode === 'auth/invalid-email') {
                setMessage('El email ingresado no es válido, inténtelo de nuevo.\n(Ej: vacunar@react.com)')
                setShowModal(true)
            } else if (errorCode === 'auth/user-not-found') {
                setMessage('No existe usuario registrado con ese email, inténtelo de nuevo.')
                setShowModal(true)
            } else {
                setMessage(errorMessage)
                setShowModal(true)
            }
        })
    }

    const ResetPassword = async (values) => {
        console.log(values.email)
        await app.auth().sendPasswordResetEmail(values.email)
        .then(() => {
            alert('Se le ha enviado un email para recuperar su contraseña.')
        }).catch((error) => {
            let errorCode = error.code
            let errorMessage = error.message

            if (errorCode === 'auth/invalid-email') {
                setMessage('El email ingresado no es válido')
                setShowModal(true)
            } else if (errorCode === 'auth/user-not-found') {
                setMessage('No existe usuario registrado con ese email')
                setShowModal(true)
            } else if (errorCode === 'auth/argument-error') {
                setMessage('Por favor ingrese un email válido')
                setShowModal(true)
            } else {
                setMessage(errorMessage)
                setShowModal(true)
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
            {showModal && <ModalError message={message} handleClose={() => setShowModal(false)} showModal={showModal} />}
            <img src={imgVacunar} alt="logo Vacunar" style={styleImg}/>
            <div style={width}>
                <h1 style={{color:'#efefef'}}>VacunAr</h1>
                <p>Complete email y contraseña para ingresar o crear una nueva cuenta</p>
                <Formik 
                    initialValues={initialValues} 
                    validationSchema={validationSchema}
                >
                {( {values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,dirty, isValid }) => (
                    <Form style={width} onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control 
                                type="email"
                                name="email"
                                onBlur={handleBlur}
                                value={values.email}
                                style={{border: touched.email && errors.email ? '2px solid #000000' : null }}
                                onChange={handleChange}
                                />
                            {touched.email && errors.email ? 
                                <Form.Text style={{color:'#000000'}}>{errors.email}</Form.Text>
                            : null}
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Contraseña:</Form.Label>
                            <Form.Control 
                                type="password" 
                                name="password"
                                onBlur={handleBlur}
                                value={values.password}
                                style={{border: touched.password && errors.password ? '2px solid #000000' : null }}
                                onChange={handleChange} />
                            {touched.password && errors.password ? 
                                <Form.Text style={{color:'#000000'}}>{errors.password}</Form.Text>
                            : null}
                        </Form.Group>
                        
                        <Form.Group>
                            <Button variant="light" onClick={() => signUpSubmit(values)} style={{marginRight:'2em'}} disabled={!(dirty && isValid)}>
                                Registrarse
                            </Button>
                            <Button variant="light" onClick={() => LoginSubmit(values)} disabled={!(dirty && isValid)}>
                                Ingresar
                            </Button>
                        </Form.Group>
                        <Form.Group>
                            <h5 onClick={() => ResetPassword(values)} style={{color:'#efefef', fontSize:'1em', cursor:'pointer'}}>Olvidé mi contraseña</h5>
                        </Form.Group>
                    </Form>
                    )}
                </Formik>
            </div>
    </div>
    )
}