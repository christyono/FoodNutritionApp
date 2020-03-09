import React, {Component} from 'react';
import Foods from './components/foods';
import Form from './components/form'

class App extends Component{

  state = {
    foods: [],
    user_input: {
      Fat : 0,
      Carbohydrate : 0,
      Sugar : 0,
      Protein: 0
    }
  }

  printfoods = (info) => {
    this.setState({foods: info})
  }

  componentDidMount() {
    fetch("http://"+window.location.hostname+':5000/api/v1/foods', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.user_input)
      })
    .then(res => res.json())
    .then((data) => {
      this.setState({ foods: data })
    })
    .catch(console.log())
  }

  render(){
    return(
      <div>
        <Form onSubmit={this.printfoods}/>
        <Foods foods={this.state.foods} />
      </div>
    )
  }
}

export default App;
