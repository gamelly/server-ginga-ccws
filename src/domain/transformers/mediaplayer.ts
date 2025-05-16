import { MediaPlayerAction, MediaPlayerResponse, MediaPlayerRow, MediaPlayerState } from "../mediaplayer";

const mapActionsToStateS: Record<MediaPlayerAction, MediaPlayerState> = {
  prepare: "prepared",
  start: "playing",
  pause: "paused",
  resume: "playing",
  stop: "prepared",
  unload: "idle",
};

export function getStateFromAction(action: MediaPlayerAction): MediaPlayerState {
  return mapActionsToStateS[action];
}

export function MediaPlayerRowToMediaPlayerResponse(row: MediaPlayerRow): MediaPlayerResponse {
  const timestamp = Date.now()
  const currTime = row.time !== 0? timestamp - row.time: 0
  const duration = row.time !== 0? currTime + 1000: 0
  const vol = row.time !== 0? 10: 0
  
  return {
    id: row.id,
    state: row.state,
    currentMedia: row.url,
    pos: {
      x: row.pos_x,
      y: row.pos_y,
      w: row.pos_w,
      h: row.pos_h
    },
    duration,
    currTime,
    vol
  };
}

export function MediaPlayerRowToMediaPlayerResponseList(row: MediaPlayerRow) {
  return {
    players: [MediaPlayerRowToMediaPlayerResponse(row)]
  }
}

