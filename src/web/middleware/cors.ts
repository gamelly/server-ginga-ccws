
import type { Middleware } from "../router";

export const corsMiddleware: Middleware = async (req, next) => {
  const addHeaders = (oldHeaders?: HeadersInit) => {
    const headers = new Headers(oldHeaders);
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Headers", "*");
    headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    return headers
  }

  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: addHeaders()
    });
  }

  const response = await next();
  const headers = addHeaders(response.headers);

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
