import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import './Weather.css';

class Weather extends Component {

  createOverview = () => {
    let overview = [];

    for (let i = 7; i <= 39; i += 8) {
      let tempList = this.props.temperature3hr.list[i].main.temp;
      let descList = this.props.temperature3hr.list[i].weather[0].description;
      let iconList = this.props.temperature3hr.list[i].weather[0].icon;

      overview.push(
        <div key={"weatherID" + i}>
          <h2 key={"hours" + i}>From {(i + 1) * 3} hours from now</h2>
          <p key={"temp" + i}>{Math.round(tempList - 272.15) + " "}</p>
          <p key={"desc" + i}>{descList}</p>
          <img key={"icon" + i} src={`https://openweathermap.org/img/wn/${iconList}@2x.png`} alt={`${iconList}`}></img>
        </div>
      );
    }

    console.log(overview);
    return overview;
  }

  render() {
    return (
      <Router basename={'/'}>
        <Switch>
          <Route exact path={`${process.env.PUBLIC_URL}/`}>
            <div>
              {this.props.city && this.props.country && <Navbar />}
              {this.props.city && this.props.country && (
                <p>
                  Location: {this.props.city}, {this.props.country}
                </p>
              )}
              {this.props.temperature && (
                <p>Temperature: {Math.round(this.props.temperature - 272.15)}°C</p>
              )}
              {this.props.description && <p>Condition: {this.props.description}</p>}
              {this.props.error && <p>{this.props.error}</p>}
              {this.props.icon && <img src={`https://openweathermap.org/img/wn/${this.props.icon}@2x.png`} alt={`${this.props.icon}`}></img>}
            </div>
          </Route>

          <Route path={`${process.env.PUBLIC_URL}/daily`} >
            {this.props.city && this.props.country && <Navbar />}
            {this.props.city && this.props.country && this.createOverview()}
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default Weather;
