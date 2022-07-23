import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import Avatar from 'react-avatar';
import AvatarEditor from './AvatarEditor';
import { useQuery, gql } from '@apollo/client';

const GET_USERS = gql`
  query Users {
    users {
    id
    nickname
    email
    }
  }
`;

function DisplayUsers() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( </p>;

  return data.users.map(({ id, nickname, email }: {id: number, nickname: string, email: string}) => (
    <div key={id}>
      <h3>nickname:{nickname}</h3>
      <p>email:{email}</p>
      <br />
    </div>
  ));
}

type Props = {};

type State = {};

// function App() {
class App extends Component<Props, State> {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Avatar name="App logo" src={logo} />
          <DisplayUsers />
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
