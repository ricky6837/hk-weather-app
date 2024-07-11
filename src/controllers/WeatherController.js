import Geolocation from 'react-native-geolocation-service';
import WeatherModel from '../models/WeatherModel';
import ApiService from '../services/ApiService';
import { locations, images } from '../data/data';

class WeatherController {
  constructor(weatherModel) {
    this.weatherModel = weatherModel;
  }

  async getNearestLocation() {
    try {
      const position = await new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 });
      });

      const nearestLocation = this.weatherModel.findNearestLocation(position.coords.latitude, position.coords.longitude, locations);
      return nearestLocation;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getTemperatureData() {
    try {
      const weatherData = await ApiService.fetchWeatherData();
      const nearestLocation = await this.getNearestLocation();

      const temperature = weatherData.temperature.data.map(data => {
        const image = images.find(item => item.name === data.place);
        return {
          place: data.place,
          unit: data.unit,
          value: data.value,
          url: image ? image.url : 'https://www.hko.gov.hk/wxinfo/aws/hko_mica/hk2/latest_HK2.jpg',
          nearest: nearestLocation.name === data.place ? true : false,
        };
      });

      const index = temperature.findIndex(data => data.place === nearestLocation.name);
      if (index !== -1) {
        const [removed] = temperature.splice(index, 1);
        temperature.unshift(removed);
      }

      this.weatherModel.setData(temperature);

      return temperature;
    } catch (error) {
      throw error;
    }
  }

  getFilteredData(query) {
    return this.weatherModel.getFilteredData(query);
  }
}

export default new WeatherController(new WeatherModel());
