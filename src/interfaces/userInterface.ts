export interface Payload {
  id?: number;
  username: string;
}

export interface User extends Payload {
  classe: string;
  level: number;
  password: string;
}

export interface Login {
  username: string;
  password: string;
}
