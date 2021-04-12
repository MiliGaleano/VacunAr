import firebase from 'firebase/app'
import 'firebase/firestore'

export default async function GetImprimir(lista,usermail,nombre) {

    const ListaVacunas = []
    const db = firebase.firestore()

    lista.map((item) => 
        item.lista.map((vac) =>
                db.collection("users").doc(usermail).collection('datauser').doc(nombre).collection('listaVacunas').doc(item.id).collection(vac).where('__name__',"==",vac).get()
                .then((query) => {  
                    const vacUser = query.docs[0]
                        if (vacUser !== undefined) {
                            const {lugar, fecha} = vacUser.data()
                            let vacunasUsuario = {
                                periodo: item.periodo,
                                vac: vac,
                                fecha: fecha,
                                lugar: lugar
                                }
                            ListaVacunas.push(vacunasUsuario)
                        }
                })
                .then(() => {
                    return ListaVacunas
                })
                .catch(err => console.log(err))
            )
    ) 
    return ListaVacunas
}