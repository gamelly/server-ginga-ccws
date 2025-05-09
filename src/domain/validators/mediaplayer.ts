import { MediaPlayerAction, MediaPlayerRequest, MediaPlayerState } from "../mediaplayer";
import * as HttpGinga from "../../web/http/ginga";

const transitions: Record<MediaPlayerState, MediaPlayerState[]> = {
  idle: ["stopped", "playing", "prepared", "paused"],
  prepared: ["idle"],
  playing: ["idle", "prepared", "paused", "stopped"],
  paused: ["playing"],
  stopped: ["playing", "paused"],
};

type Field = keyof MediaPlayerRequest;

type ValidationRules = {
  required: Field[];
  optional: Field[];
};

const validationSchemaByAction: Record<MediaPlayerAction, ValidationRules> = {
  prepare: {
    required: ["url", "pos"],
    optional: ["vol", "currTime"]
  },
  start: {
    required: ["url", "pos"],
    optional: ["vol", "currTime"]
  },
  pause: {
    required: [],
    optional: ["currTime"],
  },
  resume: {
    required: [],
    optional: ["currTime"],
  },
  stop: {
    required: [],
    optional: [],
  },
  unload: {
    required: [],
    optional: [],
  },
};

export function checkMediaPlayerTransition(from: MediaPlayerState, to: MediaPlayerState) {
  return !(transitions[to]?.includes(from))? HttpGinga.IlegalArgumentValueError: null
}

export function checkMediaPlayerBody(body: MediaPlayerRequest) {
  const action = body.action
  const rules = validationSchemaByAction[action];
  const required = ['action', ...(rules.required ?? [])];
  const optional = rules.optional ?? [];
  const allowed = new Set([...required, ...optional]);

  const hasInvalidFields = Object.entries(body).some(
    ([key, value]) => !allowed.has(key as Field) && value !== undefined
  );

  const hasMissingRequired = required.some(
    (key) => body[key] === undefined || body[key] === null
  );

  const invalidPos = allowed.has("pos") &&  body.pos !== undefined &&
    ["x", "y", "w", "h"].some((k) => typeof (body.pos as any)[k] !== "number");

  return hasInvalidFields || hasMissingRequired || invalidPos ? HttpGinga.IlegalArgumentValueError : null;
}
