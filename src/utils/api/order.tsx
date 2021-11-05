import { sendGetRequest } from "../../lib/http-client";

export function getList(page, query) {
  const q = { page, query };
  return sendGetRequest('/orders', { page, q: query }, { credential: true });
}
