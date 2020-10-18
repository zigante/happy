import { Feather, FontAwesome } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import * as ReactNative from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import MapMarker from '../images/map-marker.png';
import * as Types from '../models';
import Api from '../services/Api';

const Orphanage = () => {
  const { id } = useRoute().params as { id: string };

  const [orphanage, setOrphanage] = React.useState<Types.Orphanage>();

  React.useEffect(() => {
    Api.get(`/orphanages/${id}`).then(({ data }) => {
      setOrphanage(data);
    });
  }, [id]);

  if (!orphanage)
    return (
      <ReactNative.View style={styles.container}>
        <ReactNative.Text style={styles.description}>Carregando...</ReactNative.Text>
      </ReactNative.View>
    );

  const { about, contact, instructions, latitude, longitude, name, openOnWeekends, openingHours, images } = orphanage;

  return (
    <ReactNative.ScrollView style={styles.container}>
      {!!images?.length && (
        <ReactNative.View style={styles.imagesContainer}>
          <ReactNative.ScrollView horizontal pagingEnabled>
            {images?.map(({ path: uri }) => (
              <ReactNative.Image key={uri} style={styles.image} source={{ uri }} />
            ))}
          </ReactNative.ScrollView>
        </ReactNative.View>
      )}

      <ReactNative.View style={styles.detailsContainer}>
        <ReactNative.Text style={styles.title}>{name}</ReactNative.Text>
        <ReactNative.Text style={styles.description}>{about}</ReactNative.Text>

        <ReactNative.View style={styles.mapContainer}>
          <MapView
            initialRegion={{ latitude, longitude, latitudeDelta: 0.008, longitudeDelta: 0.008 }}
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            style={styles.mapStyle}
          >
            <Marker icon={MapMarker} coordinate={{ latitude, longitude }} />
          </MapView>

          <ReactNative.TouchableOpacity
            onPress={() =>
              ReactNative.Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`)
            }
            style={styles.routesContainer}
          >
            <ReactNative.Text style={styles.routesText}>Ver rotas no Google Maps</ReactNative.Text>
          </ReactNative.TouchableOpacity>
        </ReactNative.View>

        <ReactNative.View style={styles.separator} />

        <ReactNative.Text style={styles.title}>Instruções para visita</ReactNative.Text>
        <ReactNative.Text style={styles.description}>{instructions}</ReactNative.Text>

        <ReactNative.View style={styles.scheduleContainer}>
          <ReactNative.View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
            <Feather name='clock' size={40} color='#2AB5D1' />
            <ReactNative.Text style={[styles.scheduleText, styles.scheduleTextBlue]}>
              Segunda à Sexta {openingHours}
            </ReactNative.Text>
          </ReactNative.View>
          <ReactNative.View
            style={[styles.scheduleItem, styles[openOnWeekends ? 'scheduleItemGreen' : 'scheduleItemRed']]}
          >
            <Feather name='info' size={40} color={openOnWeekends ? '#39CC83' : '#ff669d'} />
            <ReactNative.Text
              style={[styles.scheduleText, styles[openOnWeekends ? 'scheduleTextGreen' : 'scheduleTextRed']]}
            >
              {!openOnWeekends ? 'Não' : ''} Atendemos fim de semana
            </ReactNative.Text>
          </ReactNative.View>
        </ReactNative.View>

        <RectButton
          style={styles.contactButton}
          onPress={() => ReactNative.Linking.openURL(`https://api.whatsapp.com/send?phone=${contact}`)}
        >
          <FontAwesome name='whatsapp' size={24} color='#FFF' />
          <ReactNative.Text style={styles.contactButtonText}>Entrar em contato</ReactNative.Text>
        </RectButton>
      </ReactNative.View>
    </ReactNative.ScrollView>
  );
};

const styles = ReactNative.StyleSheet.create({
  container: {
    flex: 1,
  },

  imagesContainer: {
    height: 240,
  },

  image: {
    width: ReactNative.Dimensions.get('window').width,
    height: 240,
    resizeMode: 'cover',
  },

  detailsContainer: {
    padding: 24,
  },

  title: {
    color: '#4D6F80',
    fontSize: 30,
    fontFamily: 'Nunito_700Bold',
  },

  description: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#5c8599',
    lineHeight: 24,
    marginTop: 16,
  },

  mapContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.2,
    borderColor: '#B3DAE2',
    marginTop: 40,
    backgroundColor: '#E6F7FB',
  },

  mapStyle: {
    width: '100%',
    height: 150,
  },

  routesContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  routesText: {
    fontFamily: 'Nunito_700Bold',
    color: '#0089a5',
  },

  separator: {
    height: 0.8,
    width: '100%',
    backgroundColor: '#D3E2E6',
    marginVertical: 40,
  },

  scheduleContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  scheduleItem: {
    width: '48%',
    padding: 20,
  },

  scheduleItemBlue: {
    backgroundColor: '#E6F7FB',
    borderWidth: 1,
    borderColor: '#B3DAE2',
    borderRadius: 20,
  },

  scheduleItemGreen: {
    backgroundColor: '#EDFFF6',
    borderWidth: 1,
    borderColor: '#A1E9C5',
    borderRadius: 20,
  },

  scheduleItemRed: {
    backgroundColor: '#fef6f9',
    borderWidth: 1,
    borderColor: '#ffbcd4',
    borderRadius: 20,
  },

  scheduleText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
  },

  scheduleTextBlue: {
    color: '#5C8599',
  },

  scheduleTextGreen: {
    color: '#37C77F',
  },
  scheduleTextRed: {
    color: '#ff669d',
  },

  contactButton: {
    backgroundColor: '#3CDC8C',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 40,
  },

  contactButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    color: '#FFF',
    fontSize: 16,
    marginLeft: 16,
  },
});

export default Orphanage;
