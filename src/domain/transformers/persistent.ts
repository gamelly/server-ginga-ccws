import { Persistent } from "../persistent";

export function PersistentToResponse(storage: Persistent) {
  return {
    key: storage.key,
    value: storage.set[storage.key]
  }
}

export function PersistentListToResponseList(list: Persistent[]) {
  return list.map(item => ({
    key: item.key,
    value: item.set[item.key]
  }));
}