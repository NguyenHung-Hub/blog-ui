import { IDataPost, IDataPostRecommend, IPost } from "~/interfaces/post";
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

interface ListPostParams {
  page?: number;
  limit?: number;
  categorySlug?: string;
  status?: string[];
  authorId?: string;
}

export const listPost = async ({
  page = 1,
  limit = 9,
  categorySlug = "",
  status = [],
  authorId = "",
}: ListPostParams): Promise<IDataPost> => {
  try {
    let url = `/post?page=${page}&limit=${limit}`;
    if (categorySlug != "") {
      url += `&category_slug=${categorySlug}`;
    }
    if (status.length > 0) {
      url += `&status=${status.join("&status=")}`;
    }
    if (authorId != "") {
      url += `&author_id=${authorId}`;
    }

    const res = await get<IDataPost>(url);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPostRecommend = async (
  quantity: number,
): Promise<IDataPostRecommend[]> => {
  try {
    const res = await get<IDataPostRecommend[]>(
      `/post/recommend?n=${quantity}`,
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
