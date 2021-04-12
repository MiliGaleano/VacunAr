import firebase from 'firebase/app'
import 'firebase/firestore'
import app from '../config/config'

export default function GetVacunas() {

    app.firestore()
    const ListaVacunas = []
    const db = firebase.firestore()

    return db.collection('vacunas').get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const { lista, periodo } = doc.data()
            let vacuna = {
                id: doc.id,
                lista: lista,
                periodo: periodo
            }
            ListaVacunas.push(vacuna)
        })
        sessionStorage.setItem('listaVacunas', JSON.stringify(ListaVacunas))
    }).then(() => {
       return ListaVacunas
    })
    .catch((error) => {
        console.log(error)
    })
}