export interface Entries {
  _id: string;
  title: string;
  tagsId: string;
  usersId: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface UserRegister {
  username: string;
  email: string;
  password: string;
}
export interface UserRegisterError {
  username: string;
  email: string;
  password: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface Response {
  ok: boolean;
  data?: any;
  error?: any;
}
