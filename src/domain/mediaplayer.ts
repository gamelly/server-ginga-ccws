export type MediaPlayerAction = "start" | "pause" | "pause" | "resume" | "unload" | "prepare" | "stop";

export type MediaPlayerState = "idle" | "prepared" | "playing" | "paused" | "stopped";

export interface MediaPlayerRow {
    id: number,
    state: MediaPlayerState;
    url: string;
    pos_x: number;
    pos_y: number;
    pos_w: number;
    pos_h: number;
    time: number;
}

export interface MediaPlayerRequest {
    action: MediaPlayerAction;
    url?: string;
    pos?: {
      x: number;
      y: number;
      w: number;
      h: number;
    };
    vol?: number;
    currTime?: number;
}

export interface MediaPlayerResponse extends Omit<Required<MediaPlayerRequest>, "url" | "action"> {
    id: number;
    state: MediaPlayerState,
    currentMedia: string;
    duration: number;
}
