import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

const Loading = () => {
    return (
        <div style={{width:'100vw', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Spinner animation="border" variant="primary" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    )
}

export default Loading