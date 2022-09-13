import { Roles } from './get-me.types';

export interface SignUpBodyInterface {
  username: string;
  password: string;
  role: Roles;
}
