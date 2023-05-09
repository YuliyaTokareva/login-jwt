import { IUser } from './IUser';
export type UserState = {
  user: IUser | {};
  isLoading: boolean;
  isOuth: boolean;
  errors: string[];
};
