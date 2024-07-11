import React from 'react';
import { View, StyleSheet } from 'react-native';
import WeatherScreen from './src/screens/WeatherScreen';

const App = () => {
  return (
    <View style={styles.container}>
      <WeatherScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d8e9ee',
  },
});

export default App;

