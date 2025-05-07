import * as HttpGinga from "../../web/http/ginga";

export function checkPersistentKey(key: string | null) {
  if (!key) {
    return HttpGinga.MissingArgumentError;
  }
  if (!/^(channel|service)\.[a-zA-Z_]+$/.test(key)) {
    return HttpGinga.IlegalArgumentValueError;
  }
  return null;
}
