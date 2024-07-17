import { IResponse } from "./common";
import { IPostSearch } from "./post";
import { IResourceFull } from "./resource";

export interface ISearchDataResponse {
  post: IPostSearch[];
  resource: IResourceFull[];
}

export interface ISearchResponse extends IResponse<ISearchDataResponse> {}
