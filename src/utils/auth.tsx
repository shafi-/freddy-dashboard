import Cookies from "js-cookie";

const AuthKey = 'freddie-dash-auth-token';
const AuthRefreshKey = 'freddie-dash-refresh-token';

function addMinutes(date: Date, minutes: number) {
  date.setMinutes(date.getMinutes() + minutes);
  return date;
}

export function saveAuthToken(token: string) : boolean {
  try {
    // Cookies lib doesn't offer to set expiration time based on minutes.
    // So we need to use a datetime as expires
    let expiresAt = addMinutes(new Date(), 14);
    Cookies.set(AuthKey, token, { expires: expiresAt });
    return true;
  } catch (err) {
    return false;
  }
}

export function saveRefreshToken(token: string) : boolean {
  try {
    const expiresAt = 30; // 30 days
    Cookies.set(AuthRefreshKey, token, { expires: expiresAt }); // Cookies supports day number as expire time by default
    return true;
  } catch (err) {
    return false;
  }
}

export function getAuthToken() : string|null {
  try {
    return Cookies.get(AuthKey);
  } catch (err) {
    return null;
  }
}

export function getRefreshToken() : string|null {
  try {
    return Cookies.get(AuthRefreshKey);
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
