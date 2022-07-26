import { getApolloClient } from '../apollo';
import { Q_ME } from '../apollo/Operations'

export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

export const login = (token: string) => {
  localStorage.setItem('token', token);

  return getApolloClient().then((client) => {
    return client.query({query: Q_ME }).then((response) => {
      let user = null;
  
      if (response?.data?.me) {
        const { data: { me } } = response;
        console.log('client.query(Q_ME) me: ', me);
        user = {
          ...me,
          username: me.nickname,
          accessToken: token,
          roles: ['user'],
        };
        localStorage.setItem('user', JSON.stringify(user));
      }
  
      return user;
    });  
  });
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);

  return null;
};


