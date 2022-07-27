import authHeader from "./auth-header";

export const getPublicContent = () => {
  return 'Public Content';
};

export const getUserBoard = () => {
  return  `Token: "${JSON.stringify(authHeader())}".`;
};
