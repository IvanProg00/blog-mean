export interface Entry {
  _id: string;
  title: string;
  text: string;
  tagsId: Tag;
  usersId: User;
}

export interface AddEntry {
  title: string;
  text: string;
  tagsId: string;
  usersId: string;
}

export interface ChangeEntry {
  _id: string;
  title: string;
  text: string;
  tagsId: Tag;
}

export interface Tag {
  _id: string;
  title: string;
}

export interface AddTag {
  title: string;
  token: string;
}

export interface ChangeTag {
  _id: string;
  title: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  privelages: number;
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
