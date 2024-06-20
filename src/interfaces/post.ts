import { ICategory } from "./category";

export interface IPost {
  _id: string;
  title: string;
  description: string;
  photo: string;
  author: string;
  categories: Array<ICategory>;
  slug: string;
  status: "visibility" | "hidden";
  createdAt: string;
  updatedAt: string;
}

export interface IDataPost {
  data: Array<IPost>;
  filter: { status: string };
  paging: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface IDataPostRecommend {
  title: string;
  slug: string;
}

export interface ICreatePost {
  title: string;
  description: string;
  photo: string;
  author: string;
  categories: string[];
  status: "visibility" | "hidden" | "deleted";
}

export interface IUpdatePost extends ICreatePost {
  _id: string;
}
export interface IUpdatePostStatus {
  _id: string;
  author: string;
  status: "visibility" | "hidden";
}

export interface ICreatePostRes {
  _id: string;
  title: string;
  description: string;
  photo: string;
  author: string;
  categories: string;
  slug: string;
  status: "visibility" | "hidden";
  createdAt: string;
  updatedAt: string;
}

export interface IUpdatePostRes extends ICreatePostRes {}
