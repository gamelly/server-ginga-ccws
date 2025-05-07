export interface Persistent {
  id?: number;
  key: string;
  set: {
    [key: string]: string;
  };
}
