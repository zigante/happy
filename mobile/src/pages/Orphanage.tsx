import React from 'react';
import * as ReactNative from 'react-native';

const Orphanage = () => {
  return (
    <ReactNative.View style={styles.container}>
      <ReactNative.Text style={styles.text}>Orphanage</ReactNative.Text>
    </ReactNative.View>
  );
};

const styles = ReactNative.StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000000',
  },
});

export default Orphanage;
