import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Header from './components/Header';
import Orphanage from './pages/Orphanage';
import OrphanagesMap from './pages/OrphanagesMap';
import MapSelection from './pages/CreateOrphanage/Map';
import Form from './pages/CreateOrphanage/Form';

const { Navigator, Screen } = createStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name='orphanages-map' component={OrphanagesMap} />
        <Screen
          name='orphanage'
          component={Orphanage}
          options={{ headerShown: true, header: () => <Header title='Orfanato' showClose={false} /> }}
        />
        <Screen
          name='map-selection'
          component={MapSelection}
          options={{ headerShown: true, header: () => <Header title='Selecione no mapa' /> }}
        />
        <Screen
          name='form'
          component={Form}
          options={{ headerShown: true, header: () => <Header title='Preencha os dados' /> }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default Router;
