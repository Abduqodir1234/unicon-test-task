import { Request } from 'express';

export enum Roles {
  Controller = 'Controller',
  Recipent = 'Recipent',
}

export interface User {}

export interface UserWithoutId {
  username: string;
  password: string;
  role: Roles;
}

export interface RequestWithUser extends Request {
  user?: {
    userId: number;
    role: Roles;
  };
}
