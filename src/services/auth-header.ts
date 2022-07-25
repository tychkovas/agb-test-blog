export default function authHeader() {
  const token = localStorage.getItem("token");



  console.log(`localStorage.getItem token =  ${token}.`);

  // return { Authorization: 'Bearer ' + token }; // for Spring Boot back-end
  // return { 'x-access-token': token };       // for Node.js Express back-end
  return { 'x-token': token };

}