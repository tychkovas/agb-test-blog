import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import Avatar from 'react-avatar';
import AvatarEditor from './AvatarEditor';

type Props = {};

type State = {};

// function App() {
class App extends Component<Props, State> {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Avatar name="App logo" src={logo} />
          <Avatar name="My Avatar" size="100" round="20px"/>
          <br />
          <h3>Load Avatar</h3>
          <div>
            <AvatarEditor />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
