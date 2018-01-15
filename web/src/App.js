import React, { Component } from 'react';
import './App.css';
import Button from './components/Button';
import PlaneSelect from './components/PlaneSelect';
import SaveForm from './components/SaveForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SaveForm/>
      </div>
    );
  }
}

export default App;
