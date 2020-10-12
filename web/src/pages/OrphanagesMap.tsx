import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { Map, TileLayer } from 'react-leaflet';
import { Link } from 'react-router-dom';
import MapMarker from '../images/map-marker.svg';
import '../styles/pages/orphanages-map.css';
import 'leaflet/dist/leaflet.css';

const { REACT_APP_MAPBOX_TOKEN } = process.env;

const OrphanagesMap = () => (
  <div id='page-map'>
    <aside>
      <header>
        <img src={MapMarker} alt='Happy' />

        <h2>Escolha um orfanato no mapa</h2>
        <p>Muitas crianças estão esperando a sua visita :)</p>
      </header>

      <footer>
        <strong>São Paulo</strong>
        <span>São Bernardo do Campo</span>
      </footer>
    </aside>

    <Map center={[-23.7048854, -46.5644216]} zoom={15} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${REACT_APP_MAPBOX_TOKEN}`}
      />
    </Map>

    <Link to='' className='create-orphanage'>
      <FiPlus size={32} color='#fffff' />
    </Link>
  </div>
);

export default OrphanagesMap;
