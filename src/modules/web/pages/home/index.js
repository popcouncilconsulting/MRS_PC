import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    return <div>
    <img className="justify-content-md-center" src="https://upload.wikimedia.org/wikipedia/commons/c/c2/Population_Council_Logo.png" alt="Image missing" width="720" height="320"></img>
    <h1 style={{textAlign: 'center', color: '#09af00'}}>Welcome to Meeting Room Scheduler</h1>
    <br/>
    <h4 style={{textAlign: 'center', color: '#09af00'}}>You can book the meeting rooms here for IHC or NOIDA offices</h4>
    </div>;
  }
}


