export type ResponseMessage = {
  message: string;
  success: boolean;
  data: any;
};

export type LoginModel = {
  login: string;
  password: string;
};

export type ViewModel = {
  viewName: string;
};

export type UserModel = {
  id: number;
  created: Date;
  updated: Date;
  username: string;
  email: string;
};

export type DataListModel = {
  collectionName: string;
  filter?: string;
  size?: number;
  limit?: number;
  ID?: number[];
};

export type RecordModel = {
  [key: string]: any;
};

export type DataInsertModel = {
  collectionName: string;
  values: Map<string, any>[] | RecordModel | object;
};

export type DataUpdateModel = {
  collectionName: string;
  ID: number;
  values: Map<string, any>[] | RecordModel | object;
};

export type DataDeleteModel = {
  collectionName: string;
  ID: number;
};

export type TaskModel = {
  id: number;
  title: string;
  desc: string;
  user_id: number;
  priority: number;
  finished: boolean | null;
  deadline: Date;
  created: Date;
  updated: Date;
};

export type FileInsertModel = {
  file: any;
  ref_id: number;
  ref_type: string;
};