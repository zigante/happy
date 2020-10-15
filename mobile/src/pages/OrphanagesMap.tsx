import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import * as ReactNative from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapMarker from '../images/map-marker.png';

const OrphanagesMap = () => {
  const coordinate = { latitude: -23.7048854, longitude: -46.5644216 };
  const navigation = useNavigation();

  const handleNavigation = (page: string) => navigation.navigate(page);

  return (
    <ReactNative.View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{ ...coordinate, latitudeDelta: 0.008, longitudeDelta: 0.008 }}
      >
        <Marker calloutAnchor={{ x: 3.1, y: 0.85 }} icon={MapMarker} {...{ coordinate }}>
          <Callout tooltip onPress={() => handleNavigation('orphanage')}>
            <ReactNative.View style={styles.calloutContainer}>
              <ReactNative.Text style={styles.calloutText}>Lar das Meninas</ReactNative.Text>
            </ReactNative.View>
          </Callout>
        </Marker>
      </MapView>

      <ReactNative.View style={styles.footer}>
        <ReactNative.Text style={styles.footerText}>2 orfanatos encontrados</ReactNative.Text>
        <ReactNative.TouchableOpacity style={styles.createOrphanageButton} onPress={() => {}}>
          <Feather name='plus' size={20} color='#ffffff' />
        </ReactNative.TouchableOpacity>
      </ReactNative.View>
    </ReactNative.View>
  );
};

const styles = ReactNative.StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: ReactNative.Dimensions.get('window').width,
    height: ReactNative.Dimensions.get('window').height,
  },
  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
  },
  calloutText: {
    color: '#0089a5',
    fontSize: 14,
    fontFamily: 'Nunito_700Bold',
  },
  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },
  footerText: {
    fontFamily: 'Nunito_700Bold',
    color: '#8fa7b3',
  },
  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrphanagesMap;
