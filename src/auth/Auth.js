export const isAuthenticated = () => {
  const account = sessionStorage.getItem("account_address");

  return !!account;
};

export const authenticate = (account) => {
  sessionStorage.setItem("account_address", account);
};

export const getAccount = () => {
  return sessionStorage.getItem("account_address");
};
