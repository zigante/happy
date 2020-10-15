import React from 'react';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { Orphanage } from '../entities/Orphanage';
import MapMarker from '../images/map-marker.svg';
import MapIcon from '../partials/MapIcon';
import api from '../services/api';
import '../styles/pages/orphanages-map.css';

const { REACT_APP_MAPBOX_TOKEN } = process.env;

const OrphanagesMap = () => {
  const [orphanages, setOrphanages] = React.useState<Orphanage[]>([]);

  React.useEffect(() => {
    api.get('/orphanages').then(({ data }) => setOrphanages(data.data));
  }, []);

  return (
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
        {orphanages.map(({ id, name, latitude, longitude }) => (
          <Marker key={id} position={[latitude, longitude]} icon={MapIcon({ popupAnchor: [170, 2] })}>
            <Popup closeButton={false} minWidth={240} maxWidth={240} className='map-popup'>
              {name}
              <Link to={`/orphanages/${id}`}>
                <FiArrowRight size={28} color='#fffff' />
              </Link>
            </Popup>
          </Marker>
        ))}
      </Map>

      <Link to='/orphanages/create' className='create-orphanage'>
        <FiPlus size={32} color='#fffff' />
      </Link>
    </div>
  );
};

export default OrphanagesMap;
