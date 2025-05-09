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
  const playedtime = timestamp - row.time
  
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
    vol: 10,
    duration: playedtime + 1000,
    currTime: playedtime
  };
}

export function MediaPlayerRowToMediaPlayerResponseList(row: MediaPlayerRow) {
  return {
    players: [MediaPlayerRowToMediaPlayerResponse(row)]
  }
}

