export const setUser = (userData) => ({
  type: "SET_USER",
  payload: userData,
});

export const logoutUser = () => ({
  type: "LOGOUT",
});

export const setCryptoData = (data) => ({
  type: "SET_CRYPTO_DATA",
  payload: data,
});

export const setCryptoError = (error) => ({
  type: "SET_CRYPTO_ERROR",
  payload: error,
});
