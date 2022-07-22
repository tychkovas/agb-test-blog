import React from 'react';
import logo from './logo.svg';
import './App.css';
import Avatar from 'react-avatar';
import AvatarEditor from './AvatarEditor';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Avatar name="App logo" src={logo} />
        <Avatar name="My Avatar" size="300" round="20px"/>
        <p>
          Edit react <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <br />
        <h3>Load Avatar</h3>
        <div>
          <AvatarEditor />
        </div>
      </header>
    </div>
  );
}

export default App;
