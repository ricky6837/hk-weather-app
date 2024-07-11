class WeatherModel {
  constructor() {
    this.data = [];
  }

  setData(temperatureData) {
    this.data = temperatureData;
  }

  getFilteredData(query) {
    return this.data.filter(item => {
      return item.place.toLowerCase().includes(query.toLowerCase());
    });
  }

  findNearestLocation(currentLat, currentLon, locations) {
    let nearestLocation = null;
    let smallestDistance = Number.MAX_SAFE_INTEGER;

    locations.forEach((location) => {
      const distance = this.getDistanceFromLatLonInKm(
        currentLat,
        currentLon,
        location.latitude,
        location.longitude
      );

      if (distance < smallestDistance) {
        smallestDistance = distance;
        nearestLocation = location;
      }
    });

    return nearestLocation;
  }

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
}

export default WeatherModel;
