import React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import {AuthContext} from './context/authContext'
import {UserDataContext} from './context/userContext'
import './App.css'
import Mapa from './pages/mapa';
import MisVacunas from './pages/misVacunas'
import Calendario from './pages/calendario'
import Noticias from './pages/noticias'
import Login from './pages/login'
import Edit from './pages/edit'

function App() {

  return (
      <AuthContext>
        <UserDataContext>
          <BrowserRouter basename={process.env.PUBLIC_URL}>
                  <Redirect
                    from="/"
                    to="/misVacunas" />
                    <Route
                      path="/misVacunas"
                      component={MisVacunas} />
                    <Route
                      exact
                      path="/calendario"
                      component={Calendario} />
                    <Route
                      exact
                      path="/noticias"
                      component={Noticias} />
                    <Route
                      exact
                      path="/mapa"
                      component={Mapa} />
                    <Route
                    exact
                    path="/login"
                    component={Login} />
                    <Route
                    exact
                    path="/edit"
                    component={Edit} />
          </BrowserRouter>
        </UserDataContext>
      </AuthContext>
  )
}

export default App
