import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { useHistory } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MapIcon from '../partials/MapIcon';
import api from '../services/api';
import '../styles/pages/create-orphanage.css';
import InputMask from 'react-input-mask';

const CreateOrphanage = () => {
  const history = useHistory();

  const [position, setPosition] = React.useState<number[]>([]);
  const [name, setName] = React.useState<string>('');
  const [about, setAbout] = React.useState<string>('');
  const [instructions, setInstructions] = React.useState<string>('');
  const [openingHours, setOpeningHours] = React.useState<string>('');
  const [openOnWeekends, setOpenOnWeekends] = React.useState<boolean>(false);
  const [contact, setContanct] = React.useState<string>('');
  const [images, setImages] = React.useState<File[]>([]);
  const [previewImages, setPreviewImages] = React.useState<string[]>([]);

  const [latitude, longitude] = position;

  const handleSelectedImages = ({ target: { files } }: React.ChangeEvent<HTMLInputElement>) => {
    if (!files) return;
    const filesArray = Array.from(files);
    setImages(filesArray);
    setPreviewImages(filesArray.map((image) => URL.createObjectURL(image)));
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      name,
      about,
      instructions,
      latitude,
      longitude,
      openingHours,
      openOnWeekends,
      contact,
      images,
    };

    const data = new FormData();
    Object.keys(payload).forEach((key) => {
      const items = payload[key as keyof typeof payload];

      if (Array.isArray(items))
        return items.forEach((item) => data.append(key, item instanceof File ? item : String(item)));
      return data.append(key, String(items));
    });

    api.post('/orphanages', data).then(() => history.push('/app'));
  };
  console.log(contact);
  return (
    <div id='page-create-orphanage'>
      <Sidebar />

      <main>
        <form onSubmit={submit} className='create-orphanage-form'>
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-23.7048854, -46.5644216]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={({ latlng: { lat, lng } }) => setPosition([lat, lng])}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position.length && <Marker interactive={false} icon={MapIcon()} position={[latitude, longitude]} />}
            </Map>

            <div className='input-block'>
              <label htmlFor='name'>Nome</label>
              <input id='name' value={name} onChange={({ target: { value } }) => setName(value)} />
            </div>

            <div className='input-block'>
              <label htmlFor='contact'>Telefone</label>
              <InputMask
                id='contact'
                value={contact}
                onChange={({ target: { value } }: Record<string, any>) => setContanct(value)}
                mask={'+5\\5 (99) 99999-9999'}
              />
            </div>

            <div className='input-block'>
              <label htmlFor='about'>
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea id='name' maxLength={300} value={about} onChange={({ target: { value } }) => setAbout(value)} />
            </div>

            <div className='input-block'>
              <label htmlFor='images'>Fotos</label>
              <div className='images-container'>
                {previewImages.map((src, key) => (
                  <img {...{ src, key }} alt={src} />
                ))}

                <label htmlFor='image[]' className='new-image'>
                  <FiPlus size={24} color='#15b6d6' />
                </label>

                <input type='file' id='image[]' multiple onChange={handleSelectedImages} />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className='input-block'>
              <label htmlFor='instructions'>Instruções</label>
              <textarea
                id='instructions'
                value={instructions}
                onChange={({ target: { value } }) => setInstructions(value)}
              />
            </div>

            <div className='input-block'>
              <label htmlFor='opening_hours'>Horário de funcionamento</label>
              <input
                id='opening_hours'
                value={openingHours}
                onChange={({ target: { value } }) => setOpeningHours(value)}
              />
            </div>

            <div className='input-block'>
              <label htmlFor='open_on_weekends'>Atende fim de semana</label>

              <div className='button-select'>
                <button
                  type='button'
                  className={openOnWeekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type='button'
                  className={!openOnWeekends ? 'inactive' : ''}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className='confirm-button' type='submit'>
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateOrphanage;
