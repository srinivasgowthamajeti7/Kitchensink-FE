

import React from 'react';
import './App.css';
import MemberRegistration from './MemberRegistration';
import Jboss from './assets/Jboss.png'

const App = () => {
  return (
    <div className="App">
      <div style={{display: "flex", flexDirection: "row"}}>
        <div style={{width: "60%"}}>
          <MemberRegistration />
        </div>
        <div>
          <img src={Jboss} height='240px' />
        </div>
      </div>
      <footer>
        <p>This project was generated from a Maven archetype from JBoss.</p>
      </footer>
    </div>
  );
};

export default App;
