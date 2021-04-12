import firebase from 'firebase/app'
import 'firebase/firestore'
import app from '../config/config'

export default function GetEventos(usermail,nombre) {

    app.firestore()
    const ListaEventos = []
    const db = firebase.firestore()

    return db.collection("users").doc(usermail).collection('datauser').doc(nombre).collection('eventos').get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const { fecha, lugar, vacuna} = doc.data()
            let evento = {
                id: doc.id,
                fecha: fecha,
                lugar: lugar,
                vacuna: vacuna
            }
            ListaEventos.push(evento)
        })
    }).then(() => {
       return ListaEventos
    })
    .catch((error) => {
        console.log(error)
    })
}