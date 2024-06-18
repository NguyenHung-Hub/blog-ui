export interface IUser {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  description: string;
  posts: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ILoginReq {
  email: string;
  password: string;
}
export interface ILoginRes {
  session_id: string;
  access_token: string;
  user: IUser;
}
