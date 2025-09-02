import authData from "./auth-data";
import { getUrl } from "./utils";

async function post<TBody, TResult>(path: string, body: TBody): Promise<TResult> {
  const url = getUrl(path);
  const headers = buildHeaders();
  const response = await fetch(url, { method: "POST", headers: headers, body: JSON.stringify(body) });
  return handleResponse(response);
}

async function get<TResult>(path: string): Promise<TResult> {
  const url = getUrl(path);
  const headers = buildHeaders();
  const response = await fetch(url, { method: "GET", headers: headers });
  handleResponse(response);
  return handleResponse(response);
}

function handleResponse<T>(response: Response): T {
  if (response.ok) {
    return response.json() as T;
  }

  if (response.status === 401) {
    authData.unauthenticate();
  }

  throw new Error(response.statusText);
}

function buildHeaders(): Headers {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  const token = authData.getToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
}

export default {
  get,
  post
}