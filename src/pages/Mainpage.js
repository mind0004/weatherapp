import React, { Component } from 'react';
import './Mainpage.css';
import Titles from '../components/titles/Titles';
import Form from '../components/form/Form';
import Weather from '../components/weatherdisplay/Weather';
import { API_KEY } from '../components/myApiKey/ApiKey';

class Mainpage extends Component {
    state = {
        city: undefined,
        country: undefined,
        temperature: undefined,
        description: undefined,
        feels_like: undefined,
        icon: undefined,
        temperature3hr: undefined,
        feels_like3hr: undefined,
        description3hr: undefined,
        icon3hr: undefined,
        error: undefined,
        loading: false
    };

    getWeather = async e => {
        // Prevent default reload from submit button
        e.preventDefault();

        // Form values
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;

        this.setState({ loading: true })

        // 1st weather API
        const api_call = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`
        );
        const data = await api_call.json();

        // 2nd weather API
        const api_call_3hr = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}`
        );
        const data_3hr = await api_call_3hr.json();

        // State configuration
        if ((!city && !country) || (city && !country)) {
            this.setState({
                city: undefined,
                country: undefined,
                temperature: undefined,
                description: undefined,
                feels_like: undefined,
                icon: undefined,
                temperature3hr: undefined,
                feels_like3hr: undefined,
                description3hr: undefined,
                icon3hr: undefined,
                error: 'Wrong city or country value',
                loading: false
            });
        }

        if (city || (city && country)) {
            if (data.cod === 200) {
                //console.log([i]);
                this.setState({
                    city: data.name,
                    country: data.sys.country,
                    temperature: data.main.temp,
                    description: data.weather[0].description,
                    feels_like: data.main.feels_like,
                    icon: data.weather[0].icon,
                    temperature3hr: data_3hr,
                    description3hr: data_3hr,
                    feels_like3hr: data_3hr,
                    icon3hr: data_3hr,
                    error: '',
                    loading: false
                });
            } else {
                this.setState({
                    city: undefined,
                    country: undefined,
                    temperature: undefined,
                    description: undefined,
                    feels_like: undefined,
                    icon: undefined,
                    temperature3hr: undefined,
                    feels_like3hr: undefined,
                    description3hr: undefined,
                    icon3hr: undefined,
                    error: 'Wrong city or country',
                    loading: false
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
                    feels_like={this.state.feels_like}
                    description={this.state.description}
                    icon={this.state.icon}
                    temperature3hr={this.state.temperature3hr}
                    description3hr={this.state.description3hr}
                    icon3hr={this.state.icon3hr}
                    error={this.state.error}
                    loading={this.state.loading}
                />
            </div>
        );
    }
}

export default Mainpage;
