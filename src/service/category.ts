import { ICategories } from "~/interfaces/category";
import { get, postWithToken2 } from "~/util/httpRequest";

export const getCategories = async (): Promise<ICategories[] | undefined> => {
  try {
    const res = await get<ICategories[]>(`/categories`);
    return res;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const createCategory = async (
  name: string,
): Promise<ICategories | undefined> => {
  try {
    const res = await postWithToken2<{ code: number; data: ICategories }>(
      "/category",
      { name },
    );
    console.log(`file: category.ts:9 > res:`, res);
    if (res) return res.data;
  } catch (error) {
    console.log(`file: category.ts:8 > error:`, error);
    return undefined;
  }
};

export const searchCategories = async (
  text: string,
): Promise<ICategories[]> => {
  try {
    const res = await get<ICategories[]>(`/categories/search?value=${text}`);
    if (res) return res;
    else return [];
  } catch (error) {
    console.log(error);
    throw error;
  }
};
