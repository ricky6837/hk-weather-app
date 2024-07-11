import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, RefreshControl, StyleSheet } from 'react-native';
import WeatherController from '../controllers/WeatherController';
import Cell from '../views/Cell';
import BottomPopup from '../views/BottomPopup';
import Message from '../views/Message';
import Icon from 'react-native-vector-icons/FontAwesome';

const WeatherScreen = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const showBottomPopup = (item) => {
    setIsPopupVisible(true);
    setSelectedItem(item);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const getData = async () => {
    try {
      setLoading(true);
      const weatherData = await WeatherController.getTemperatureData();
      setWeatherData(weatherData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const searchLocation = (text) => {
    const filteredData = WeatherController.getFilteredData(text, weatherData)
    setWeatherData(filteredData)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>香港各區氣溫</Text>
      <View style={styles.searchBarContainer}>
        <View style={styles.icon}>
          <Icon name="search" size={18} />
        </View>
        <TextInput
          placeholder="搜索地區"
          onChangeText={searchLocation}
        />
      </View>
      {loading ? (
        <Message msg={'請等等...'}></Message>
      ) : error ? (
        <Message msg={`錯誤：${error}`}></Message>
      ) : weatherData.length > 0 ? (
        <View style={styles.body}>
          <FlatList
            data={weatherData}
            keyExtractor={item => item.place}
            renderItem={({ item }) => <Cell item={item} showBottomPopup={showBottomPopup} />}
            refreshControl={
              <RefreshControl
                onRefresh={getData}
              />
            }
          />
        </View>
      ) : (
        <Message msg={'沒有數據...'}></Message>
      )}
      <BottomPopup isVisible={isPopupVisible} onClose={closePopup} item={selectedItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
  },
  body: {
    flex: 1,
  },
  searchBarContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 8,
    borderRadius: 10,
    marginVertical: 8,
    height: 40,
  },
  icon: {
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
});

export default WeatherScreen;
