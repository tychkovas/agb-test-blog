import axios from 'axios';

const API_URL = 'http://localhost:4001/graphql';

export const signIn = async (variables) => axios.post(API_URL, {
  query: `
      mutation SignIn($login: String!, $password: String!) {
        signIn(nickname: $login, password: $password) {
          token
        }
      }
    `,
  variables,
});

export const me = async (token) => axios.post(
  API_URL,
  {
    query: `
        {
          me {
            id
            email
            nickname
          }
        }
      `,
  },
  token
    ? {
      headers: {
        'x-token': token,
      },
    }
    : null,
);

export const user = async (variables) => axios.post(API_URL, {
  query: `
      query ($id: Int!) {
        user(id: $id) {
          id
          nickname
          email
        }
      }
    `,
  variables,
});

export const users = async () => axios.post(API_URL, {
  query: `
      {
        users {
          id
          nickname
          email
        }
      }
    `,
});

export const signUp = async (variables) => axios.post(API_URL, {
  query: `
      mutation(
        $nickname: String!,
        $email: String!,
        $password: String!
      ) {
        signUp(
          nickname: $nickname,
          email: $email,
          password: $password
        ) {
          token
        }
      }
    `,
  variables,
});

export const updateUser = async (variables, token) => axios.post(
  API_URL,
  {
    query: `
        mutation ($nickname: String!) {
          updateUser(nickname: $nickname) {
            nickname
          }
        }
      `,
    variables,
  },
  token
    ? {
      headers: {
        'x-token': token,
      },
    }
    : null,
);

export const deleteUser = async (variables, token) => axios.post(
  API_URL,
  {
    query: `
        mutation ($id: Int!) {
          deleteUser(id: $id)
        }
      `,
    variables,
  },
  token
    ? {
      headers: {
        'x-token': token,
      },
    }
    : null,
);
