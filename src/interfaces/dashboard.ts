import { IResponse } from "./common";

interface ICount {
  visibility: number;
  hidden: number;
}

export interface ICountData {
  post: ICount;
  resource: ICount;
}

export interface ICountDataResponse extends IResponse<ICountData> {}
