import React from 'react'
import Button from 'react-bootstrap/Button'

const CalendarioGoogle = ({nombre,lugar,vacuna,fecha,usermail,handleCloseGoogle}) => {

    let gapi = window.gapi
    let CLIENT_ID = "63483747529-c7b230revog3if6uoua2d0omuik3qrs7.apps.googleusercontent.com"
    let API_KEY = "AIzaSyCDU4UQUjr1IFuK09jLyX59gVOYP4MUVug"
    let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    let SCOPES = "https://www.googleapis.com/auth/calendar.events"
  
    const handleClick = () => {
      gapi.load('client:auth2', () => {
        console.log('cliente ok')
  
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
  
        gapi.client.load('calendar', 'v3', () => console.log('anda!'))
  
        gapi.auth2.getAuthInstance().signIn()
        .then(() => {
          
          let event = {
            'summary': `Vacunación ${nombre}`,
            'location': `${lugar}`,
            'description': `${vacuna}`,
            'start': {
                'dateTime': `${fecha}T09:00:00-07:00`,
                'timeZone': 'America/Argentina/Buenos_Aires'
            },
            'end': {
              'dateTime': `${fecha}T17:00:00-07:00`,
              'timeZone': 'America/Argentina/Buenos_Aires'
            },
            'recurrence': [
              'RRULE:FREQ=DAILY;COUNT=2'
            ],
            'attendees': [
              {'email': `${usermail}`}
            ],
            'reminders': {
              'useDefault': false,
              'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10}
              ]
            }
          }
  
          let request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event
          })
  
          request.execute(event => {
            console.log(event)
            window.open(event.htmlLink)
          })
        })
    })

    handleCloseGoogle()
  }

    return (
        <div>
            <Button variant="primary" onClick={handleClick}>Aceptar</Button>
        </div>
    )
}

export default CalendarioGoogle