import React, { Component } from 'react';
// import context
import { ProfilerConsumer } from '../../../../context/profileContext'
// import components
import Calendar from './Calendar_Vindhyanchal'

class Dashboard extends Component {

  render() {
    return (
      <ProfilerConsumer>
        {context => {
          if (context.email) {
            return (
              <div>
                <div><strong>User : {context.email}</strong></div>
                <Calendar uid={context.uid} />
                
              </div>
            )
          }
        }}
      </ProfilerConsumer>
    )
  }

}

export default (Dashboard);
