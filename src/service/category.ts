import { ICategories } from "~/interfaces/category";
import { get } from "~/util/httpRequest";

export const getCategories = async (): Promise<ICategories[] | undefined> => {
  try {
    const res = await get<ICategories[]>(`/categories`);
    return res;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
