import * as persistent from "../../app/service/persistent";
import * as validator from "../../domain/validators/persistent";
import * as transform from "../../domain/transformers/persistent";
import * as HttpGinga from '../http/ginga'
import { HttpResponse } from "../http/response";

import type { Handler } from "../router";

export const post: Handler = async (req, params) => {
  const { varValue } = await req.json().catch(() => ({}))
  const keyValue = new URL(req.url).searchParams.get("var-name");
  const error = validator.checkPersistentKey(keyValue) || validator.checkPersistentKey(params.key)

  if (!varValue) {
    return HttpResponse.gingaError(HttpGinga.MissingArgumentError)
  }

  if (keyValue != params.key) {
    return HttpResponse.gingaError(HttpGinga.IlegalArgumentValueError)
  }

  if (error) {
    return HttpResponse.gingaError(error)
  }

  const storage = persistent.save(keyValue, varValue)

  return HttpResponse.json(transform.PersistentToResponse(storage));
};

export const getOne: Handler = async (req, params) => {
  const error = validator.checkPersistentKey(params.key)

  if (error) {
    return HttpResponse.gingaError(error)
  }
  
  const storage = persistent.load(params.key)

  if (!storage) {
    return HttpResponse.json(transform.PersistentListToResponseList([]));
  }

  return HttpResponse.json(transform.PersistentToResponse(storage));
};

export const getAll: Handler = async (req) => {
  const storage = persistent.loadAll()
  return HttpResponse.json(transform.PersistentListToResponseList(storage));
};
