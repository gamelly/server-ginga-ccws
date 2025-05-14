import { serve } from "bun";
import { addRoute, handleRequest, use } from "./web/router";
import * as route_persistent from "./web/routes/persistent";
import * as route_mediaplayers from "./web/routes/mediaplayers";
import { logMiddleware } from "./web/middleware/log";

//use(logMiddleware);

addRoute("POST", "/dtv/current-service/ginga/persistent/:key", route_persistent.post);
addRoute("GET", "/dtv/current-service/ginga/persistent", route_persistent.getAll);
addRoute("GET", "/dtv/current-service/ginga/persistent/:key", route_persistent.getOne);

addRoute("POST", "/dtv/mediaplayers/:id", route_mediaplayers.post);
addRoute("GET", "/dtv/mediaplayers", route_mediaplayers.getAll);
addRoute("GET", "/dtv/mediaplayers/:id", route_mediaplayers.getOne);

serve({
  port: 44642,
  fetch: handleRequest,
});
