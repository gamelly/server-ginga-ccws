export type Handler = (req: Request, params: Record<string, string>) => Response | Promise<Response>;
export type Middleware = (req: Request, next: () => Promise<Response>) => Response | Promise<Response>;

interface Route {
  method: string;
  pattern: RegExp;
  keys: string[];
  handler: Handler;
}

const routes: Route[] = [];
const middlewares: Middleware[] = [];

export function addRoute(method: string, path: string, handler: Handler) {
  const keys: string[] = [];
  const pattern = new RegExp("^" + path.replace(/:([a-zA-Z]+)/g, (_, key) => {
    keys.push(key);
    return "([^/]+)";
  }) + "$");

  routes.push({ method, pattern, keys, handler });
}

export function use(middleware: Middleware) {
  middlewares.push(middleware);
}

export async function handleRequest(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const pathname = url.pathname;

  for (const route of routes) {
    if (req.method !== route.method) continue;

    const match = route.pattern.exec(pathname);
    if (match) {
      const params: Record<string, string> = {};
      route.keys.forEach((key, i) => {
        params[key] = decodeURIComponent(match[i + 1]);
      });

      let i = 0;
      const run = async (): Promise<Response> => {
        if (i < middlewares.length) {
          const mw = middlewares[i++];
          return await mw(req, run);
        }
        return await route.handler(req, params);
      };

      return await run();
    }
  }

  return new Response("API Not Found", { status: 404 });
}
