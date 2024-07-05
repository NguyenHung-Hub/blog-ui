import { TResourceStatus, TResourceType } from "~/types/resource";
import { ICategory } from "./category";
import { IResponse } from "./common";

export interface IResource {
  _id: string;
  title: string;
  description: string;
  url: string;
  categories: Array<string[]>;
  status: TResourceStatus;
  type: TResourceType;
  createdAt: string;
  updatedAt: string;
}
export interface IResourceFull extends Omit<IResource, "categories"> {
  categories: Array<ICategory>;
}

export interface IResourceResponse {
  code: number;
  data: Array<IResourceFull>;
  message?: string | null;
  error?: string | null;
  filter: { status: string; type?: string };
  paging: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface IResourceCreate
  extends Pick<
    IResourceFull,
    "title" | "description" | "status" | "type" | "url"
  > {
  categories: string[];
}
export interface IResourceUpdate
  extends Pick<IResource, "_id">,
    Partial<Omit<IResource, "_id">> {}

export interface IResourceCreateResponse extends IResponse<{ _id: string }> {}
export interface IResourceUpdateResponse extends IResponse<IResource> {}
export interface IResourceDeleteResponse extends IResponse<null> {}
