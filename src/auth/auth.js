export const login = (username, password) => {
  const isValid = username === import.meta.env.VITE_USERNAME && password === import.meta.env.VITE_PASSWORD;

  if (isValid) {
    localStorage.setItem('isAuthenticated', 'true');
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem('isAuthenticated');
};

export const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};
