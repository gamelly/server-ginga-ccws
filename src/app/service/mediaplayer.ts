import { MediaPlayerRequest, MediaPlayerResponse, MediaPlayerRow, MediaPlayerState } from "../../domain/mediaplayer";
import { getStateFromAction } from "../../domain/transformers/mediaplayer";
import { db } from "../../infra/db";

function updateState(id: number, value?: MediaPlayerState) {
  value !== undefined && db.prepare('UPDATE mediaplayer SET state = ? WHERE id = ?').run(value, id)
}

function updateUrl(id: number, value?: string) {
  value !== undefined && db.prepare('UPDATE mediaplayer SET url = ? WHERE id = ?').run(value, id)
}

function updatePos(id: number, pos?: MediaPlayerRequest["pos"]) {
  pos !== undefined && db.prepare('UPDATE mediaplayer SET pos_x = ?, pos_y = ?, pos_w = ?, pos_h = ? WHERE id = ?').run(pos.x, pos.y, pos.w, pos.h, id)
}

function updateTime(id: number, value?: number) {
  value !== undefined && db.prepare('UPDATE mediaplayer SET time = ? WHERE id = ?').run(value, id)
}

export function status(id: number, _body?: MediaPlayerRequest): MediaPlayerRow | null {
  const stmt = db.prepare(`SELECT id, state, url, pos_x, pos_y, pos_w, pos_h, time FROM mediaplayer WHERE id = ?`);
  const row = stmt.get(id) as MediaPlayerRow | undefined;
 
  if (!row) return null;

  return row;
}

export function unload(id: number, body: MediaPlayerRequest) {
  const state = getStateFromAction('unload')
  const pos = {x: 0, y: 0, w: 0, h: 0}
  updateState(id, state)
  updateUrl(id, '')
  updatePos(id, pos)
  updateTime(id, 0)
  return status(id, body)
}

export function prepare(id: number, body: MediaPlayerRequest) {
  const state = getStateFromAction('prepare')
  const timestamp = Date.now()
  const timeVideo = timestamp - (body.currTime ?? 0)
  updateState(id, state)
  updateUrl(id, body.url)
  updatePos(id, body.pos)
  updateTime(id, timeVideo)
  return status(id, body)
}

export function start(id: number, body: MediaPlayerRequest) {
  const state = getStateFromAction('start')
  const timestamp = Date.now()
  const timeVideo = timestamp - (body.currTime ?? 0)
  updateState(id, state)
  updateUrl(id, body.url)
  updatePos(id, body.pos)
  updateTime(id, timeVideo)
  return status(id, body)
}

export function pause(id: number, body: MediaPlayerRequest) {
  const state = getStateFromAction('pause')
  updateState(id, state)
  return status(id, body)
}

export function resume(id: number, body: MediaPlayerRequest) {
  const state = getStateFromAction('resume')
  updateState(id, state)
  return status(id, body)
}

export function stop(id: number, body: MediaPlayerRequest) {
  const state = getStateFromAction('stop')
  updateState(id, state)
  return status(id, body)
}
