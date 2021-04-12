import React, { useEffect, useState } from 'react'
import Loading from '../components/loading';
import app from '../config/config'

export const Auth = React.createContext()

export const AuthContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [showChild, setShowChild] = useState(false)

    useEffect(() => {
        app.auth().onAuthStateChanged(function(user) {
            setUser(user);
            setShowChild(true);
        })
        
    }, [])

    if (!showChild) {
        return <Loading></Loading>
    } else {
        return (
            <Auth.Provider
                value={{
                    user
                }}
            >
                {children}
            </Auth.Provider>
        )
    }
}