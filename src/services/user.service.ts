import authHeader from "./auth-header";

export const getPublicContent = () => {
  return 'Public Content';
};

export const getUserBoard = () => {
  const text = `${JSON.stringify(authHeader()).substring(0,30)} ...`;
  return  `Token: "${text}".`;
};
