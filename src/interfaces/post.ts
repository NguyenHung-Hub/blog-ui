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
