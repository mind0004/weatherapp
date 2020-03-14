import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import './Weather.css';
import { BarLoader } from 'react-spinners';
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 30px;
`;


class Weather extends Component {
  state = {
    loading: true
  }

  createOverview = () => {
    let overview = [];

    for (let i = 7; i <= 39; i += 8) {
      let tempList = this.props.temperature3hr.list[i].main.temp;
      let feels_likeList = this.props.temperature3hr.list[i].main.feels_like;
      let descList = this.props.temperature3hr.list[i].weather[0].description;
      let iconList = this.props.temperature3hr.list[i].weather[0].icon;

      overview.push(
        <div key={"weatherID" + i} className="multibox">
          <div key={"hoursbox" + i} className="box">
            <h2 key={"hours" + i}>In {(i + 1) * 3} hours:</h2>
          </div>
          <div key={"tempbox" + i} className="box">
            <p key={"temp" + i}>Temperature: {Math.round(tempList - 272.15) + " "}°C</p>
          </div>
          <div key={"feels_likebox" + i} className="box">
            <p key={"feels_like" + i}>Feels like: {Math.round(feels_likeList - 272.15) + " "}°C</p>
          </div>
          <div key={"descbox" + i} className="box">
            <p key={"desc" + i}>Condition: {descList}</p>
          </div>
          <div key={"iconbox" + i} className="box">
            <img key={"icon" + i} src={`https://openweathermap.org/img/wn/${iconList}@2x.png`} alt={`${iconList}`}></img>
          </div>
        </div >
      );
    }
    return overview;
  }

  render() {
    return (
      <Router basename={'/'}>
        <Switch>
          <Route exact path={`${process.env.PUBLIC_URL}/`}>
            <div className="error-message">
              {this.props.error && <p className="error-message">{this.props.error}</p>}
            </div>

            {this.props.loading ?
              <BarLoader loading={this.props.loading} css={override} />
              :
              <div>
                {this.props.city && (
                  <div className="singleweather-container">
                    <Navbar />
                    <h3>{this.props.city}, {this.props.country}</h3>
                    <div className="singleweather-box">
                      <div className="singlebox">
                        <h2>Current weather:</h2>
                      </div>
                      <div className="singlebox">
                        <p>Temperature: {Math.round(this.props.temperature - 272.15)}°C</p>
                      </div>
                      <div className="singlebox">
                        <p>Feels like: {Math.round(this.props.temperature - 272.15)}°C</p>
                      </div>
                      <div className="singlebox">
                        <p>Condition: {this.props.description}</p>
                      </div>
                      <div className="singlebox">
                        <img src={`https://openweathermap.org/img/wn/${this.props.icon}@2x.png`} alt={`${this.props.icon}`}></img>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            }
          </Route>

          <Route path={`${process.env.PUBLIC_URL}/daily`} >
            <div className="error-message">
              {this.props.error && <p>{this.props.error}</p>}
            </div>
            {this.props.loading ?
              <BarLoader loading={this.props.loading} css={override} />
              :
              <div>
                {this.props.city && (
                  <div className="multipleweather-container">
                    <Navbar />
                    <h3>{this.props.city}, {this.props.country}</h3>
                    <div className="multipleweather-box">
                      {this.createOverview()}
                    </div>
                  </div>
                )}
              </div>
            }
          </Route>
        </Switch>
      </Router >
    );
  }
}

export default Weather;
