import * as mediaplayer from "../../app/service/mediaplayer";
import * as validator from "../../domain/validators/mediaplayer";
import * as transform from "../../domain/transformers/mediaplayer";
import * as HttpGinga from '../http/ginga'
import { HttpResponse } from "../http/response";

import type { Handler } from "../router";

export const post: Handler = async (req, params) => {
  return HttpResponse.gingaError(HttpGinga.PlatformResourceUnavailable)
};

export const getOne: Handler = async (_req, params) => {
  const player = mediaplayer.status(Number(params.id))

  if (!player) {
    return HttpResponse.gingaError(HttpGinga.PlatformResourceUnavailable)
  }

  return HttpResponse.json(transform.MediaPlayerRowToMediaPlayerResponse(player));
}

export const getAll: Handler = async (req) => {
  const player = mediaplayer.status(1)

  if (!player) {
    return HttpResponse.gingaError(HttpGinga.PlatformResourceUnavailable)
  }

  return HttpResponse.json(transform.MediaPlayerRowToMediaPlayerResponseList(player));
}
