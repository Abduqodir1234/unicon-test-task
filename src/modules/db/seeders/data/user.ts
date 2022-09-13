import * as bcrypt from 'bcrypt';
import { Roles, UserWithoutId } from '../../../auth/types/get-me.types';
export const userData = async (): Promise<UserWithoutId[]> => {
  return [
    {
      username: 'kdesavery0',
      password: await bcrypt.hash('NwaS8r0', 10),
      role: Roles.Recipent,
    },
    {
      username: 'dfriedenbach1',
      password: await bcrypt.hash('TTmydEOQ', 10),
      role: Roles.Controller,
    },
    {
      username: 'jharding2',
      password: await bcrypt.hash('SX89JMIHBZr', 10),
      role: Roles.Recipent,
    },
    {
      username: 'mpont3',
      password: await bcrypt.hash('BAil7Sx', 10),
      role: Roles.Recipent,
    },
    {
      username: 'eca4',
      password: await bcrypt.hash('TI1KDLkmI2', 10),
      role: Roles.Controller,
    },
    {
      username: 'bwehnerr5',
      password: await bcrypt.hash('BPKpKx', 10),
      role: Roles.Recipent,
    },
    {
      username: 'bbickerstaffe6',
      password: await bcrypt.hash('OxBYOKniMAu', 10),
      role: Roles.Recipent,
    },
    {
      username: 'vmcneill7',
      password: await bcrypt.hash('Kmq5koURZ', 10),
      role: Roles.Recipent,
    },
    {
      username: 'ascotland8',
      password: await bcrypt.hash('dblt5X6d', 10),
      role: Roles.Controller,
    },
    {
      username: 'imackill9',
      password: await bcrypt.hash('1LsBxhICqwJb', 10),
      role: Roles.Recipent,
    },
  ];
};
