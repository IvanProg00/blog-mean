export interface Entrie {
  _id: string;
  title: string;
  text: string;
  tagsId: Tag;
  usersId: User;
}

export interface AddEntrie {
  title: string;
  text: string;
  tagsId: string;
  usersId: string;
}

export interface Tag {
  _id: string;
  title: string;
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
