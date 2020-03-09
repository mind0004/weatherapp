import React, { Component } from 'react';
import './Form.css'

class Form extends Component {
  render() {
    return (

      <form onSubmit={this.props.getWeather}>
        <input type="text" name="city" placeholder="city" />
        <input type="text" name="country" placeholder="country" />
        <button>Search weather</button>
      </form>
    );
  }
}

export default Form;
