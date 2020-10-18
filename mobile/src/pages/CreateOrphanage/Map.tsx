import { useNavigation } from '@react-navigation/native';
import React from 'react';
import * as ReactNative from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import MapMarker from '../../images/map-marker.png';

const Map = () => {
  const navigation = useNavigation();
  const [coordinate, setCoordinate] = React.useState({ latitude: 0, longitude: 0 });

  return (
    <ReactNative.View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: -23.7048854,
          longitude: -46.5644216,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}
        onPress={({ nativeEvent: { coordinate: position } }) => setCoordinate({ ...position })}
      >
        {coordinate.latitude !== 0 && <Marker icon={MapMarker} {...{ coordinate }} />}
      </MapView>

      {coordinate.latitude !== 0 && (
        <RectButton style={styles.nextButton} onPress={() => navigation.navigate('form', { coordinate })}>
          <ReactNative.Text style={styles.nextButtonText}>Próximo</ReactNative.Text>
        </RectButton>
      )}
    </ReactNative.View>
  );
};

const styles = ReactNative.StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  mapStyle: {
    width: ReactNative.Dimensions.get('window').width,
    height: ReactNative.Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },
});

export default Map;
