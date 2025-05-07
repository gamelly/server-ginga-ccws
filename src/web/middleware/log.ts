import { db } from "../../infra/db";
import type { Middleware } from "../router";

export const logMiddleware: Middleware = async (req, next) => {
  const url = new URL(req.url);

  db.run("INSERT INTO logs (method, path) VALUES (?, ?)", [
    req.method,
    url.pathname
  ]);

  return await next();
};
