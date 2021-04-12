import firebase from 'firebase/app'
import 'firebase/firestore'
import app from '../config/config'

export default function GetUserData(x) {
    let userData = []
    app.firestore()
    const db = firebase.firestore()

    return db.collection('users').doc(x).collection('datauser').get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const { nombre, fecha, url } = doc.data()
            let usuario = {
                nombre: nombre,
                fecha: fecha,
                url: url
            }
            userData.push(usuario)
        })
        return userData
    })
    .catch((error) => {
        console.log(error)
    })
}