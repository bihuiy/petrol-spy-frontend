const tokenName = "petrol-spy-token";

export const setToken = (token) => {
  localStorage.setItem(tokenName, token);
};

export const getToken = () => {
  return localStorage.getItem(tokenName);
};

export const removeToken = () => {
  localStorage.removeItem(tokenName);
};

export const getUser = () => {
  // 1. get token from localStorage (if it exists)
  const token = getToken();
  // 2. If it doesn't exist, we'll return `null`
  if (!token) return null;
  // 3. If a token exists, we need to extract the payload string (middle)
  const payloadString = token.split(".")[1];
  // 4. We then decode the payload string into an object by b64 decoding
  const { user, exp } = JSON.parse(atob(payloadString));  
  // 5. Ensure the token is still within the expiry date
  const today = Date.now() / 1000;
  if (today > exp) {
    removeToken();
    return null;
  }
  // 6. Return the user if the token is valid
  return user;
};
