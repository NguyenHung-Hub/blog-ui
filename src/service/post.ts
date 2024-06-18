import { IPost } from "~/interfaces/post";
import { get } from "~/util/httpRequest";

export const listPostRandom = async ({
  n,
}: {
  n: number;
}): Promise<IPost[]> => {
  try {
    const res = await get<IPost[]>(`/post/random?n=${n}`);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
