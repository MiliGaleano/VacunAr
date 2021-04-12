import React, { useEffect, useState, useContext } from 'react'
import GetVacunas from '../services/getVacunas'
import {Auth} from '../context/authContext'
import { useHistory } from "react-router-dom"
import Loading from '../components/loading'
import ListaVacunas from '../components/listaVacunas'

const MisVacunas = () => {

    const [loading, setLoading] = useState(true)

    let history = useHistory()
    const { user } = useContext(Auth)

    useEffect(() => {
        if (user===null) {
            history.push("/login");
        } else {
            const lista = JSON.parse(sessionStorage.getItem('listaVacunas'))
            if (lista === null) {
            GetVacunas()
            .then(() => {
                setLoading(false)
            }).catch((err) => console.log(err))
            } else {
                setLoading(false)
            }
        }
    }, [history, user])

    return (
        loading ? <Loading></Loading>
        : (user) && 
        <ListaVacunas></ListaVacunas>
    )
}

export default MisVacunas