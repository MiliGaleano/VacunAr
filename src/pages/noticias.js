import React, { useEffect, useState } from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import getNoticias from '../services/getNoticias'
import NoticiaImg from '../assets/noticia.jpg'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Loading from '../components/loading'

const Noticias = () => {

    const [loading, setLoading] = useState(false)
    const [articles, setArticles] = useState([])


useEffect(() => {
    setLoading(true)
    getNoticias()
    .then((res) => {
        setArticles(res)
        setLoading(false)
    }).catch(err => console.log(err))
}, [])


    return (
        <div>
            <Header title='Noticias'></Header>
            {loading ? <Loading></Loading> :
            <div style={{ width: "92vw", marginLeft:"4vw", marginTop: "3em"}}>
                <CardDeck >
                {articles.map((ar) => 
                    <Card key={ar._id} style={{ minWidth: "18rem", marginBottom:"2em" }}>
                        <Card.Img variant="top" src={(ar.imageUrl) ? ar.imageUrl : NoticiaImg} alt='foto noticia' />
                        <Card.Body>
                            <Card.Title>{ar.title}</Card.Title>
                            <Card.Text>
                                {(ar.description === null) ? ar.title : ((ar.description.length > 250) ? ar.description.slice(0, 250) : ar.description)}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <a href={ar.sourceUrl} target="_blank" rel="noreferrer">Continuar leyendo</a>
                        </Card.Footer>
                    </Card>
                )}
                </CardDeck>
            </div>
            }
            <Footer /> 
        </div>
    )
}

export default Noticias
