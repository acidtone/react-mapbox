import { useState } from 'react'
import Map, {Marker} from 'react-map-gl'
import './App.css'
import {policeData} from './data/police-service'
import './mapbox-gl.css'

function App() {
  const [viewport, setViewport] = useState({
    latitude: '51.045756',
    longitude: '-114.070390',
    zoom: 10,
  })
  return (
      <Map 
        {...viewport} 
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        style={{width: '100vw', height: '100vh'}}
        onMove={evt => setViewport(evt.viewState)}>
        {policeData.features.map(item => (
          <Marker
            key={item.properties.name}
            latitude={item.geometry.coordinates[1]}
            longitude={item.geometry.coordinates[0]}>
            <button className="marker-btn"><img src="/police.svg" alt="Police Station" /></button>
          </Marker>
        ))}
      </Map>
  )
}

export default App
