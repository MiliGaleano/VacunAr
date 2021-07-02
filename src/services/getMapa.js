import React, {useLayoutEffect, useRef} from 'react'
import {hospitalesBsAs} from './hospitales'
import {hospitalesArg} from './hospitales'

const GetMapa = () => {

    const mapRef = useRef(null)

    useLayoutEffect(() => {
      // `mapRef.current` will be `undefined` when this hook first runs; edge case that
      if (!mapRef.current) return;

    document.addEventListener("deviceready", onDeviceReady, false)
        function onDeviceReady() {
            console.log("navigator.geolocation works well")
        }

    let svgMarker = '<svg width="40px" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 384 512" style="enable-background:new 0 0 384 512;" xml:space="preserve"><style type="text/css">.st0{fill:#7596B6;}</style><path class="st0" d="M172.3,501.7C27,291,0,269.4,0,192C0,86,86,0,192,0s192,86,192,192c0,77.4-27,99-172.3,309.7 C202.2,515.4,181.8,515.4,172.3,501.7L172.3,501.7z M192,272c44.2,0,80-35.8,80-80s-35.8-80-80-80s-80,35.8-80,80S147.8,272,192,272 z"/></svg>'

    let onSuccess = function(position) {
            let lon = position.coords.longitude
            let lat = position.coords.latitude
            let coords = {lat: lat, lng: lon}
            let icon = new H.map.Icon(svgMarker)
            let markerHere = new H.map.Marker(coords, {icon: icon})
            let bubble = new H.ui.InfoBubble(coords, {content: (`<p>Usted está aquí</p>`)})
              bubble.close()
              ui.addBubble(bubble)
              markerHere.addEventListener('tap', function () {
                  bubble.open()
              })
            hMap.addObject(markerHere)
            hMap.setCenter(coords)
            return lon, lat;
    }
    
    function centrarBsAs() {
      let lon = -58.43635721545287
      let lat = -34.57023319895224
      let coords = {lat: lat, lng: lon}
      hMap.setCenter(coords)
      return lon, lat;
    }
    
    function onError(error) {
      console.log('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n')
      centrarBsAs()
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);

      const H = window.H
      const platform = new H.service.Platform({
          apikey: "ZN0DVG6NHOjgmKmIRqORIZtGGgQVHMdnSxqdBWX5_2A"
      })
      const defaultLayers = platform.createDefaultLayers()
      const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
        center: { lat: 50, lng: 5 },
        zoom: 14,
        pixelRatio: window.devicePixelRatio || 1
      })
  
      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap))
  
      const ui = H.ui.UI.createDefault(hMap, defaultLayers, 'es-ES')
  
      hMap.addEventListener('tap', function(evt) {
    // Log 'tap' and 'mouse' events:
        console.log(evt.type, evt.currentPointer.type)
      })

    // Add cursor pointer to markers
      hMap.addEventListener('pointermove', function (event) {
        if (event.target instanceof H.map.Marker) {
          hMap.getViewPort().element.style.cursor = 'pointer';
        } else {
          hMap.getViewPort().element.style.cursor = 'auto';
        }
      }, false);

    let svgMarkup = '<svg width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#343a40" d="M201.5 174.8l55.7 55.8c3.1 3.1 3.1 8.2 0 11.3l-11.3 11.3c-3.1 3.1-8.2 3.1-11.3 0l-55.7-55.8-45.3 45.3 55.8 55.8c3.1 3.1 3.1 8.2 0 11.3l-11.3 11.3c-3.1 3.1-8.2 3.1-11.3 0L111 265.2l-26.4 26.4c-17.3 17.3-25.6 41.1-23 65.4l7.1 63.6L2.3 487c-3.1 3.1-3.1 8.2 0 11.3l11.3 11.3c3.1 3.1 8.2 3.1 11.3 0l66.3-66.3 63.6 7.1c23.9 2.6 47.9-5.4 65.4-23l181.9-181.9-135.7-135.7-64.9 65zm308.2-93.3L430.5 2.3c-3.1-3.1-8.2-3.1-11.3 0l-11.3 11.3c-3.1 3.1-3.1 8.2 0 11.3l28.3 28.3-45.3 45.3-56.6-56.6-17-17c-3.1-3.1-8.2-3.1-11.3 0l-33.9 33.9c-3.1 3.1-3.1 8.2 0 11.3l17 17L424.8 223l17 17c3.1 3.1 8.2 3.1 11.3 0l33.9-34c3.1-3.1 3.1-8.2 0-11.3l-73.5-73.5 45.3-45.3 28.3 28.3c3.1 3.1 8.2 3.1 11.3 0l11.3-11.3c3.1-3.2 3.1-8.2 0-11.4z"></path></svg>'     

    function crearMarcador(x){
 
        let array = x.features
        array.map((hosp) => {
        let icon = new H.map.Icon(svgMarkup),
            coords = {lat: hosp.geometry.coordinates[1], lng: hosp.geometry.coordinates[0]},
            marker = new H.map.Marker(coords, {icon: icon}),
            bubble = new H.ui.InfoBubble(coords, {content: 
            ((hosp.properties.WEB !== null) ? `<a href="https://${hosp.properties.WEB}" target="_blank" rel="noreferrer"><p className="bubble">${hosp.properties.NOMBRE} - TEL: ${hosp.properties.TELEFONO}</p></a>`
            : `<p className="bubble">${hosp.properties.NOMBRE} - TEL: ${hosp.properties.TELEFONO}</p>`)
            })
            
            bubble.close()
            ui.addBubble(bubble)
        //  Add event
            marker.addEventListener('tap', function (evt) {
                bubble.open()
            })
        //  Add the marker to the map:
            hMap.addObject(marker)
        }) 
    }

      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      const url = 'https://cdn.buenosaires.gob.ar/datosabiertos/datasets/salud/hospitales/hospitales.geojson';
      fetch(proxyurl + url)
      .then(response => response.text())
      .then(function (text) {
        let hospitalesBsAs = JSON.parse(text)
        crearMarcador(hospitalesBsAs)
        console.log(hospitalesBsAs.features[0].properties.WEB)
      })
      .catch(() => { 
          console.log("Can’t access " + url + " response")
          crearMarcador(hospitalesBsAs)
      })
      
      crearMarcador(hospitalesArg)

      // This will act as a cleanup to run once this hook runs again.
      // This includes when the component un-mounts
      return () => {
        hMap.dispose()
      }
    }, [])
  
    return <div className="map" ref={mapRef} style={{ height: "92vh" }} />
  }

  export default GetMapa