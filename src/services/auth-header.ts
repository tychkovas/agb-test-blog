export default function authHeader() {
  const userStr = localStorage.getItem("user");

  let user = null;
  if (userStr)
    user = JSON.parse(userStr);

  console.log(`localStorage.getItem user =  ${user}.`);

  if (user && user.accessToken) {
    // return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
    // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
    return { 'x-token': user.accessToken };

  } else {
    // return { Authorization: '' }; // for Spring Boot back-end
    // return { 'x-access-token': null }; // for Node Express back-end
    return { 'x-token': '' };
  }
}