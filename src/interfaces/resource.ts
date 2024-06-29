import { ICategory } from "./category";

export interface IResource {
  _id: string;
  title: string;
  description: string;
  url: string;
  categories: Array<ICategory>;
  status: "visibility" | "hidden";
  type:
    | "youtube"
    | "website"
    | "tool"
    | "extension"
    | "github"
    | "document"
    | "other";
  createdAt: string;
  updatedAt: string;
}

export interface IResourceResponse {
  code: number;
  data: Array<IResource>;
  message?: string | null;
  error?: string | null;
}
