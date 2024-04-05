export const isAuthenticated = () => {
  const account = sessionStorage.getItem("account_address");

  return !!account;
};
