export interface IUser {
  id: number;
  name: string;
  email: string;
}

export interface IUserPreference {
  authorIds: number[];
  categoryIds: number[];
  sourceIds: number[];
}

export interface UserContextType {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  token: string | null;
  setToken: (token: string) => void;
  preference: IUserPreference;
  setPreference: (preference: IUserPreference) => void;
  baseNewsUrl: string;
  setBaseNewsUrl: (url: string) => void;
  notification: string;
  setNotification: (message: string) => void;
}
