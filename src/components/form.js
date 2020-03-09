import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Protein: 0,
      Fat: 0,
      Carbs: 0,
      Sugar: 0
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: !isNaN(parseFloat(value)) ? parseFloat(value) : value })

  }


  handleSubmit = async (event) => {
    // alert('Protein: ' + this.state.Protein + 'Fat: ' + this.state.Fat + 'Carbs: ' + this.state.Carbs + 'Sugar: ' + this.state.Sugar);
    event.preventDefault();
    try {
      const resp = await axios.post("http://" + window.location.hostname + ':5000/api/v1/foods', this.state)
      this.props.onSubmit(resp.data);
    } catch (error) {
      // Error 😨
      if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
      alert('invalid input!')
    }
    // const resp = await axios.post("http://" + window.location.hostname + ':5000/api/v1/foods', this.state)
    // this.props.onSubmit(resp.data);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>
            Protein:
            <input type="text" name="Protein" value={this.state.Protein} onChange={this.handleInputChange} />
          </label>
        </div>
        <div className="form-group">
          <label>
            Fat:
            <input type="text" name="Fat" value={this.state.Fat} onChange={this.handleInputChange} />
          </label>
        </div>
        <div className="form-group">
          <label>
            Carbs:
            <input type="text" name="Carbs" value={this.state.Carbs} onChange={this.handleInputChange} />
          </label>
        </div>
        <div className="form-group">
          <label>
            Sugar:
            <input type="text" name="Sugar" value={this.state.Sugar} onChange={this.handleInputChange} />
          </label>
        </div>
        <input type="submit" value="Search" className="btn btn-primary" />
      </form>
    );
  }
}

export default Form