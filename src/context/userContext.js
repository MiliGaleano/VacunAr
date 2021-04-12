import React, { useEffect, useState,useContext } from 'react'
import GetUserData from '../services/getUserData'
import {Auth} from '../context/authContext'
import Loading from '../components/loading'
import app from '../config/config'

export const UserData = React.createContext()

export const UserDataContext = ({ children }) => {
    const [userData, setUserData] = useState(null)
    const [showChild, setShowChild] = useState(false)
    const [newUser, setNewUser] = useState(false)

    const { user } = useContext(Auth)

    useEffect(() => {
      app.auth().onAuthStateChanged(()=> {
        let listOfUsers=[]
        user ?
        GetUserData(user.email)
                .then((usuarios)=>{
                    usuarios.forEach((u, index) => {
                        let user = {
                            nombre: u.nombre,
                            fecha: u.fecha,
                            url: u.url,
                            active: (index === 0 ? true : false )
                        }
                        listOfUsers.push(user)
                    })
                    setUserData(listOfUsers)
                    setShowChild(true)
                })
        : setShowChild(true)
      })
    }, [user, newUser])

    const handleUpdateActive = (x) => {
        const newListActives = userData.map((user) => {
            if (user.active === true) {
              const updatedUser = {
                ...user,
                active: false
              }
              return updatedUser
            }
            if (user.nombre === x){
                const updatedUser = {
                ...user,
                active: true
              }
              return updatedUser
            }
            return user
          })
          setUserData(newListActives)
    }

    const handleUpdateUser = () => {
      setNewUser(!newUser)
    }

    if (!showChild) {
        return <Loading></Loading>
    } else {
      if (user){
          return (
              <UserData.Provider
                  value={{
                      userData, handleUpdateActive, handleUpdateUser
                  }}
              >
                  {children}
              </UserData.Provider>
          )
      } else return (
        <UserData.Provider
                  value={{undefined}}
              >
                  {children}
              </UserData.Provider>
      )
    }
}