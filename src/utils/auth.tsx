const AuthKey = 'freddie-dash-auth-token';
const AuthRefreshKey = 'freddie-dash-refresh-token';

export function saveAuthToken(token: string) : boolean {
  try {
    localStorage.setItem(AuthKey, JSON.stringify(token));
    return true;
  } catch (err) {
    return false;
  }
}

export function saveRefreshToken(token: string) : boolean {
  try {
    localStorage.setItem(AuthRefreshKey, JSON.stringify(token));
    return true;
  } catch (err) {
    return false;
  }
}

export function getAuthToken() : string|null {
  try {
    return localStorage.getItem(AuthKey);    
  } catch (err) {
    return null;
  }
}

export function getRefreshToken() : string|null {
  try {
    return localStorage.getItem(AuthRefreshKey);    
  } catch (err) {
    return null;
  }
}

export default {
  getAuthToken,
  getRefreshToken,
  saveAuthToken,
  saveRefreshToken,
};
