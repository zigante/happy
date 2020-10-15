import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiClock, FiInfo } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import * as types from '../entities/Orphanage';
import { OrphanageImage } from '../entities/OrphanageImage';
import MapIcon from '../partials/MapIcon';
import api from '../services/api';
import '../styles/pages/orphanage.css';

const Orphanage = () => {
  const { id } = useParams<{ id: string }>();
  const [orphanage, setOrphanage] = React.useState<types.Orphanage>();
  const [mainImage, setMainImage] = React.useState<OrphanageImage>();

  React.useEffect(() => {
    api.get(`orphanages/${id}`).then(({ data }) => setOrphanage(data));
  }, [id]);

  React.useEffect(() => {
    setMainImage(orphanage?.images?.[0] as OrphanageImage);
  }, [orphanage]);

  if (!orphanage) return <div>Carregando...</div>;

  const { images, name, about, latitude, longitude, instructions, openOnWeekends, openingHours, contact } = orphanage;

  return (
    <div id='page-orphanage'>
      <Sidebar />

      <main>
        <div className='orphanage-details'>
          {mainImage && <img src={mainImage?.path} alt={name} />}

          <div className='images'>
            {images?.map((image) => {
              const { path, id } = image;
              return (
                <button
                  key={id}
                  type='button'
                  className={id === mainImage?.id ? 'active' : ''}
                  onClick={() => setMainImage(image)}
                >
                  <img src={path} alt={name} />
                </button>
              );
            })}
          </div>

          <div className='orphanage-details-content'>
            <h1>{name}</h1>
            <p>{about}</p>

            <div className='map-container'>
              <Map
                center={[latitude, longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={MapIcon()} position={[latitude, longitude]} />
              </Map>

              <footer>
                <a
                  rel='noopener noreferrer'
                  target='_blank'
                  href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{instructions}</p>

            <div className='open-details'>
              <div className='hour'>
                <FiClock size={32} color='#15B6D6' />
                Segunda à Sexta <br />
                {openingHours}
              </div>
              <div className={`open-on-weekends ${openOnWeekends ? '' : 'dont-open'}`}>
                <FiInfo size={32} color={openOnWeekends ? '#39cc83' : '#ff6690'} />
                {!openOnWeekends && 'Não '} Atendemos <br />
                fim de semana
              </div>
            </div>

            <button type='button' className='contact-button'>
              <FaWhatsapp size={20} color='#FFF' />
              Entrar em contato - {contact}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Orphanage;
