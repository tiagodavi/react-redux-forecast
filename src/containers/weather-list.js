import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google-map';

class WeatherList extends Component {

  kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
  }

  buildData(cityData) {

    let temps = [];
    let pressures = [];
    let humidities = [];

    cityData.list.map(weather => {
      temps.push(this.kelvinToCelsius(weather.main.temp));
      pressures.push(weather.main.pressure);
      humidities.push(weather.main.humidity);
    });

    return {temps, pressures, humidities};
  }
  renderWeather(cityData) {

    const name = cityData.city.name;
    const data = this.buildData.bind(this)(cityData);
    const { lon, lat } = cityData.city.coord;

    return (
      <tr key={name}>
        <td> <GoogleMap lon={lon} lat={lat} /> </td>
        <td> <Chart data={data.temps} color="orange" units="°C" /> </td>
        <td> <Chart data={data.pressures} color="green" units="hPa" /> </td>
        <td> <Chart data={data.humidities} color="black" units="%" /> </td>
      </tr>
    );
  }
  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th> City </th>
            <th> Temperature (°C) </th>
            <th> Pressure  (hPa)</th>
            <th> Humidity (%) </th>
          </tr>
        </thead>
        <tbody>
          { this.props.weather.map(this.renderWeather.bind(this)) }
        </tbody>
      </table>
    );
  }
}

function mapStateToProps({ weather }) {
  return { weather };
}

export default connect(mapStateToProps)(WeatherList);
