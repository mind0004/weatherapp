import React, { Component } from 'react';
import './App.css';
import Titles from './components/Titles';
import Form from './components/form/Form';
import Weather from './components/Weather';

const API_KEY = 'b25e964d7173f6e8134a722fcf2cd126';

class App extends Component {
  state = {
    city: undefined,
    country: undefined,

    temperature: undefined,
    description: undefined,
    icon: undefined,

    temperature3hr: undefined,
    description3hr: undefined,
    icon3hr: undefined,

    error: undefined
  };

  getWeather = async e => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`
    );
    const data = await api_call.json();


    const api_call_3hr = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}`
    );
    const data_3hr = await api_call_3hr.json();

    if ((!city && !country) || (city && !country) || (city && !country)) {
      this.setState({
        city: undefined,
        country: undefined,

        temperature: undefined,
        description: undefined,
        icon: undefined,

        temperature3hr: undefined,
        description3hr: undefined,
        icon3hr: undefined,

        error: 'Ya fucked up'
      });
    }

    if (city && country) {
      if (data.cod === 200) {
        //console.log([i]);
        this.setState({
          city: data.name,
          country: data.sys.country,

          temperature: data.main.temp,
          description: data.weather[0].description,
          icon: data.weather[0].icon,

          temperature3hr: data_3hr,
          description3hr: data_3hr,
          icon3hr: data_3hr,

          error: ''
        });
      } else {
        this.setState({
          city: undefined,
          country: undefined,

          temperature: undefined,
          description: undefined,
          icon: undefined,

          temperature3hr: undefined,
          description3hr: undefined,
          icon3hr: undefined,

          error: 'Ya fucked up'
        });
      }
    }
  };

  render() {
    return (
      <div className="App">
        <Titles />
        <Form getWeather={this.getWeather} />
        <Weather
          city={this.state.city}
          country={this.state.country}

          temperature={this.state.temperature}
          description={this.state.description}
          icon={this.state.icon}

          temperature3hr={this.state.temperature3hr}
          description3hr={this.state.description3hr}
          icon3hr={this.state.icon3hr}

          error={this.state.error}
        />
      </div>
    );
  }
}

export default App;
