import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import GetMapa from '../services/getMapa'

const Mapa = () => {

    return (
        <div>
            <Header title='Mapa'/>
            <GetMapa></GetMapa>
            <Footer /> 
        </div>
    )
}

export default Mapa