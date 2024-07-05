export interface IResponse<Data> {
  code: number;
  data: Data;
  error?: any;
  message?: any;
}
