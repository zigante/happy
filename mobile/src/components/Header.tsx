import React from 'react';
import * as ReactNative from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type OwnProps = {
  title: string;
  showClose?: boolean;
};

const Header = ({ title, showClose = true }: OwnProps) => {
  const navigation = useNavigation();

  return (
    <ReactNative.View style={styles.container}>
      <BorderlessButton onPress={navigation.goBack}>
        <Feather name='arrow-left' size={24} color='#15bdb6' />
      </BorderlessButton>
      <ReactNative.Text style={styles.title}>{title}</ReactNative.Text>
      {showClose ? (
        <BorderlessButton onPress={() => navigation.navigate('orphanages-map')}>
          <Feather name='x' size={24} color='#ff669d' />
        </BorderlessButton>
      ) : (
        <ReactNative.View />
      )}
    </ReactNative.View>
  );
};

const styles = ReactNative.StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f9fafc',
    borderBottomWidth: 1,
    borderColor: '#ddd3f0',
    paddingTop: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#8fa7b3',
    fontSize: 16,
  },
});

export default Header;
