const TOKEN_KEY = "token";
const EXPIRY_KEY = "token_expiry";

export const saveToken = (token: string) => {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000); // 3 days from now
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EXPIRY_KEY, expiresAt.toISOString());
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EXPIRY_KEY);
};

export const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiry = localStorage.getItem(EXPIRY_KEY);

  if (!token || !expiry) {
    return "";
  }

  const expiryDate = new Date(expiry);
  if (expiryDate <= new Date()) {
    clearToken(); // Clear expired token
    return "";
  }

  return token;
};
