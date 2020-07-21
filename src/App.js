import React, { Component } from "react";
import "./App.css";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

class App extends Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
  };
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
    );
    const data = await api_call.json();
    if (city && country) {
      console.debug(data);
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: "",
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "City or country not found",
      });
    }
  };
  render() {
    return (
      <div>
        <Titles />
        <Form getWeather={this.getWeather} />
        <Weather
          temperature={this.state.temperature}
          city={this.state.city}
          country={this.state.country}
          humidity={this.state.humidity}
          description={this.state.description}
          error={this.state.error}
        />
        <footer>
          <img
            style={{ width: "40pt" }}
            src="https://home.openweathermap.org/assets/logo_white_cropped-011958e697955be95bdc4af6a4d1913dbf9df990cb9101a67c439879293f5947.png"
            alt="OpenWeather"
          />
          <p>
            API by <a href="https://openweathermap.org/">OpenWeather</a>
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
