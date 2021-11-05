import axios, { Method, AxiosRequestHeaders } from "axios";
import { BASE_URL } from '../constants';
import authManager from '../utils/auth';

interface RequestOption {
  credential?: boolean
  headers?: AxiosRequestHeaders
  [key: string]: any
}

const DefaultRequestOption = { credential: true };


export async function refreshToken() {
  try {
    const refreshToken = authManager.getRefreshToken().replaceAll('"', '');

    const res = await sendRequest('POST', '/refresh', null, {
      headers: {
        'Authorization': 'Bearer ' + refreshToken,
      }
    });

    if (res.ok) {
      const { access_token } = res.data;
      authManager.saveAuthToken(access_token);
    }

    return;
  } catch (err) {
    // console.error(err);
  }
}

function prepareHeaders(options: RequestOption = DefaultRequestOption) : { headers: AxiosRequestHeaders, needToRefresh: boolean } {
  const headers : AxiosRequestHeaders = {
    'Content-Type': 'application/json',
    'Accepts': 'application/json',
  };

  if (options.credential) {
    const token = authManager.getAuthToken();

    if (token) {
      headers.Authorization = 'Bearer ' + token.replaceAll('"', '');
      return { headers, needToRefresh: false };
    }

    return { headers, needToRefresh: true };
  }

  return { headers, needToRefresh: false };
}

export function sendPostRequest(url: string, data: Object, options: RequestOption = DefaultRequestOption) {
  return sendRequest('POST', url, data, options);
}

export function sendDeleteRequest(url: string, options: RequestOption = DefaultRequestOption) {
  return sendRequest('DELETE', url, null, options);
}

export function sendPutRequest(url: string, data: Object, options: RequestOption = DefaultRequestOption) {
  return sendRequest('PUT', url, data, options);
}

export function sendPatchRequest(url: string, data: Object, options: RequestOption = DefaultRequestOption) {
  return sendRequest('PATCH', url, data, options);
}

export function sendGetRequest(url: string, data: Object, options: RequestOption = DefaultRequestOption) {
  return sendRequest('GET', url, data, options);
}

/**
 * Send request and get response
 *
 * @param method request method
 * @param url request url
 * @param data request data object
 * @param options request config options
 * @returns {Promise<{ok: boolean, data: any|null, err: null|Error}>}
 */
export async function sendRequest(
  method: Method,
  url: string,
  data: Object,
  options: RequestOption = DefaultRequestOption
): Promise<{ ok: boolean; data: any | null; err: null | Error; }> {
  try {
    let headers = null;

    if (options.headers) {
      headers = options.headers;
    } else {
      let preparedHeader = prepareHeaders(options);

      if (preparedHeader.needToRefresh) {
        await refreshToken();
        preparedHeader = prepareHeaders(options);

        if (preparedHeader.needToRefresh) {
          // TODO:: take to login
          const err = new Error('Session expired. Need to login again');
          window.location.href = '/login';

          return {
            data: null,
            err,
            ok: false,
          }
        }
      }

      headers = preparedHeader.headers;
    }

    const res = await axios({
      method,
      data,
      params: data,
      baseURL: BASE_URL,
      url,
      headers,
    });
    return { ok: true, data: res.data, err: null };
  } catch (err) {
    return { ok: false, err, data: {} };
  }
}
