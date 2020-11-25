import React, { Component } from 'react';
import './App.css';
import fire from './Config/fire.js';
import GovtDashboard from './Main/Dashboard/GovtDashboard';
import SignInSide from './Main/Components/Register/SignInSide';

class App extends Component {
  constructor() {
    super();
    this.state = ({
      user: null,
    });
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }
  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }
  render(){
    return (
      <div className="App">
          <div>{this.state.user ?  ( <GovtDashboard/>) : (<SignInSide />)}</div>
      </div>
    );
  }
}

export default App;
