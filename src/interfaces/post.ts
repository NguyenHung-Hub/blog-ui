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
