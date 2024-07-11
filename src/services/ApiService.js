import axios from 'axios';

const url = 'https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=tc';

class ApiService {
  async fetchWeatherData() {
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Error fetching weather data');
      }
    } catch (error) {
      throw error;
    }
  }
}

export default new ApiService();