import { sendGetRequest } from "../../lib/http-client";

export function getData() {
  return sendGetRequest('/dashboard', null, { credential: true });
}
