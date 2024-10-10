
// // src/App.js
// import React from 'react';
// import RegistrationForm from './RegistrationForm';
// import MembersTable from './MembersTable';

// function App() {
//   return (
//     <div className="App">
//       <h1>Welcome to JBoss!</h1>
//       <p>You have successfully deployed a Jakarta EE Enterprise Application.</p>

//       <div className="registration">
//         <h2>Member Registration</h2>
//         <RegistrationForm />
//       </div>

//       <div className="members">
//         <h2>Members</h2>
//         <MembersTable />
//       </div>

//       {/* Additional content and footer */}
//     </div>
//   );
// }

// export default App;

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
