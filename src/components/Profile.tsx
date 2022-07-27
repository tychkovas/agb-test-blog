import React from "react";
import { getCurrentUser } from "../services/auth.service";
import Avatar from 'react-avatar';
import AvatarEditor from '../utils/AvatarEditor';

const Profile: React.FC = () => {
  const currentUser = getCurrentUser();
  
  return (
    <div className="container">  
      <header className="jumbotron">

        <div className="container">
          <div className="row">
            <div className="col-sm">
              <h3>
                <strong>{currentUser.username}</strong> Profile
              </h3>
            </div>
            <div className="col-xs">
              <Avatar name="My Avatar" size="100" round="20px"/>
            </div>
          </div>
        </div>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role: string, index: number) => <li key={index}>{role}</li>)}
      </ul>

      <hr/>
      <h3>Load Avatar</h3>
      <div className="container bg-secondary" >
        <AvatarEditor />
      </div>
      <hr/>
      <br/>

    </div>
  );
};

export default Profile;
