export interface Satellites {
  satellites: Array<Satellite>
}

export interface Satellite {
  name: string;
  distance: number;
  message: Array<string>;
}

export interface ResultPosition {
  x: number;
  y: number;
}

export interface Result {
  position: {
    x: number;
    y: number;
  }
  message: string;
}