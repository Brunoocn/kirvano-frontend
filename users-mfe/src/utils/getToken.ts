const AUTH_TOKEN_KEY = 'authToken';

export const getToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}