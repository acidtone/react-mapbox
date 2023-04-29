import { useState } from 'react'
import Map, {Marker, Popup} from 'react-map-gl'
import './App.css'
import {policeData} from './data/police-service'
import './mapbox-gl.css'

function App() {
  const [viewport, setViewport] = useState({
    latitude: '51.045756',
    longitude: '-114.070390',
    zoom: 10,
  })
  const [selectedStation, setSelectedStation] = useState(null);
  console.log(selectedStation);

  return (
    <div>

      <Map 
        {...viewport} 
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        style={{width: '100vw', height: '100vh'}}
        onMove={evt => setViewport(evt.viewState)}>
        {policeData.features.map(station => (
          <Marker
            key={station.properties.name}
            latitude={station.geometry.coordinates[1]}
            longitude={station.geometry.coordinates[0]}>
            <button 
              className="marker-btn"
              onClick={(evt) => {
                evt.preventDefault();
                setSelectedStation(station);
              }}><img src="/police.svg" alt="Police Station" /></button>
          </Marker>
        ))}
        {selectedStation ? (
          <Popup latitude={selectedStation.geometry.coordinates[1]} longitude={selectedStation.geometry.coordinates[0]}>
            <div>
              <h2>{selectedStation.properties.name}</h2>
              <p>{selectedStation.properties.info}<br/>
                {selectedStation.properties.address}<br/>
                {selectedStation.properties.station_ty}</p>
            </div>
          </Popup>
        ) : null}
      </Map>
    </div>
  )
}

export default App
