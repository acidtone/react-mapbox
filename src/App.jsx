import { useState, useEffect } from 'react'
import Map, {Marker, Popup} from 'react-map-gl'
import './App.css'
import './mapbox-gl.css'

function App() {
  const [viewport, setViewport] = useState({
    latitude: '51.045756',
    longitude: '-114.070390',
    zoom: 10,
  })
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async (endpoint) => {
      const response = await fetch(endpoint);
      const data = await response.json();
      setData(data);
    }

    fetchData('https://data.calgary.ca/resource/ap4r-bav3.json')
      .catch(console.error);
  },[])

  console.log(data);
  const [selectedStation, setSelectedStation] = useState(null);

  return (
    <div>

      <Map 
        {...viewport} 
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        style={{width: '100vw', height: '100vh'}}
        onMove={evt => setViewport(evt.viewState)}>
        {data.map(station => (
          <Marker
            key={station.name}
            latitude={station.point.coordinates[1]}
            longitude={station.point.coordinates[0]}>
            <button 
              className="marker-btn"
              onClick={(evt) => {
                evt.preventDefault();
                setSelectedStation(station);
              }}><img src="/police.svg" alt="Police Station" /></button>
          </Marker>
        ))}
        {selectedStation ? (
          <Popup latitude={selectedStation.point.coordinates[1]} longitude={selectedStation.point.coordinates[0]}>
            <div>
              <h2>{selectedStation.name}</h2>
              <p>{selectedStation.info}<br/>
                {selectedStation.address}<br/>
                {selectedStation.station_ty}</p>
            </div>
          </Popup>
        ) : null}
      </Map>
    </div>
  )
}

export default App
