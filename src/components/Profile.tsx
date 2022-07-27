import React from "react";
// import { getCurrentUser } from "../services/auth.service";
import { useQuery } from '@apollo/client';
import { Q_ME } from "../apollo/Operations";
import authHeader from '../services/auth-header';

const Profile: React.FC = () => {
  const { loading, error, data } = useQuery(Q_ME);

  //   "data": {
  //     "me": {
  //        ...
  //     }
  //   }
  
  if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :( </p>;
  if (error)
  {
    console.log('error: ', JSON.stringify(error));
    //logout();
      return <>
      <h3>Error authorization User :( </h3>
      <p>try logging out and back in</p>
      <p>error: {error.message}</p>
      <br />
      <p>{ JSON.stringify(error?.networkError)})</p>
    </>;
  }
  if (!data) return <p>Error data=null : ( </p>;
  const { me } = data;
  if (!me) return <p>Error me=null : ( </p>;

  console.log('me= ', me);
  
  // const currentUser = getCurrentUser();
  const { 'x-token': accessToken } = authHeader();
  const currentUser = {
    ...me,
    username: me.nickname,
    accessToken,
    roles: ['user'],
  };

  
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
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
    </div>
  );
};

export default Profile;
