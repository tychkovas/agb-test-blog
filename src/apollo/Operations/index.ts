import {gql } from '@apollo/client';


export const Q_USERS = gql`
  query Users {
    users {
    id
    nickname
    email
    }
  }
`;

export const Q_ME = gql`
  query Me {
    me {
      id
      nickname
      email
    }
  }
`;

export const M_SIGN_IN = gql`
mutation SignIn($nickname: String!, $password: String!) {
  signIn(nickname: $nickname, password: $password) {
    token
  }
}
`;

export const M_SIGN_UP = gql`
  mutation SignUp($nickname: String!, $email: String!, $password: String!) {
    signUp(nickname: $nickname, email: $email, password: $password) {
      token
    }
  }
`;