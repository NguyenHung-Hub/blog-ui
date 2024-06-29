import { IResourceResponse } from "~/interfaces/resource";
import { get } from "~/util/httpRequest";

export const getResources = async (): Promise<
  IResourceResponse | undefined
> => {
  try {
    const res = await get<IResourceResponse>(`/resources`);
    console.log(`file: resource.ts:8 > res:`, res);
    return res;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
