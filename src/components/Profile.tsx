import React from "react";
import { getCurrentUser } from "../services/auth.service";
import Avatar from 'react-avatar';
import AvatarEditor from '../utils/AvatarEditor';
import UploadFile from '../utils/UploadFile';
import logo from '../logo.svg';

import { useMutation } from '@apollo/client';
import { SINGLE_UPLOAD  } from "../apollo/Operations";


const Profile: React.FC = () => {
  const currentUser = getCurrentUser();
  console.log('logo: ', logo);
  const { avatar_src, nickname } = currentUser;

  const [mutate, { loading, error }] = useMutation(SINGLE_UPLOAD);

  const saveImageFromBase64 = async ( url : string | null) => {
    if (!url) {
      console.log('url: = null');
      return;
    }
    console.log('url: ', url.substring(0, 30), ' ... ');

    const file: File = await fetch(url) // url = 'data:image/png;base6....'
    .then(res => res.blob())
    .then(blob => {
      return new File([blob], `AvatarImg_${nickname}.png`,{ type: "image/png" });
    });

    
    console.log('file: ', file);
    return mutate({ variables: { file } });
  };


  if (loading) console.log('Profile:loading:', loading);
  if (error)   console.log('Profile:error:', JSON.stringify(error, null, 2));

  // const avatarImg = localStorage.getItem('preview');
  
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
              <Avatar name="My Avatar" src={avatar_src ? avatar_src : logo} size="100" round="20px"/>
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
      <label htmlFor="avatar">Choose a profile picture:</label>
      <UploadFile />
      <h3>Load Avatar</h3>
      {loading ? <div>Loading...</div> : null}
      {error   ? <div>error...{JSON.stringify(error, null, 2)}</div> : null}
      <div className="container bg-secondary" >
        <AvatarEditor saveImage = {{ saveImageFromBase64, loading, error }} />
      </div>
      <hr/>
      <br/>

    </div>
  );
};

export default Profile;
