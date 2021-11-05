import { sendPostRequest } from "../../lib/http-client";

export function login(data) {
  return sendPostRequest('/login', data, { credential: false });
}
