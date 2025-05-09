import * as mediaplayer from "../../app/service/mediaplayer";
import * as validator from "../../domain/validators/mediaplayer";
import * as transform from "../../domain/transformers/mediaplayer";
import * as HttpGinga from '../http/ginga'
import { HttpResponse } from "../http/response";

import type { Handler } from "../router";
import type { MediaPlayerRequest } from "../../domain/mediaplayer";

export const post: Handler = async (req, params) => {
  const id = Number(params.id)
  const body = await req.json().catch(() => ({})) as MediaPlayerRequest | null
  const body_error = body && validator.checkMediaPlayerBody(body)
  const player_old = mediaplayer.status(id)

  if (!player_old || !body) {
    return HttpResponse.gingaError(HttpGinga.PlatformResourceUnavailable)
  }

  if (body_error) {
    return HttpResponse.gingaError(body_error)
  }

  const state_old = player_old.state
  const state_new = transform.getStateFromAction(body.action)
  const state_error = validator.checkMediaPlayerTransition(state_old, state_new)

  if (state_error) {
    return HttpResponse.gingaError(state_error + 600)
  }

  const player_new = mediaplayer[body.action](id, body)

  if (!player_new) {
    return HttpResponse.gingaError(HttpGinga.PlatformResourceUnavailable)
  }

  return HttpResponse.json(transform.MediaPlayerRowToMediaPlayerResponseList(player_new));
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
