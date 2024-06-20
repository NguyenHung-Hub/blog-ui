import {
  ICreatePost,
  ICreatePostRes,
  IDataPost,
  IDataPostRecommend,
  IPost,
  IUpdatePost,
  IUpdatePostRes,
  IUpdatePostStatus,
} from "~/interfaces/post";
import { get, postWithToken, putWithToken } from "~/util/httpRequest";

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

export const getPost = async (slug: string): Promise<IPost | undefined> => {
  try {
    const res = await get<IPost>(`/post/${slug}`);
    return res;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const updatePostStatus = async (
  post: IUpdatePostStatus,
): Promise<IUpdatePostRes | undefined> => {
  console.log(`file: post.ts:46 > post:`, post);
  try {
    const res = await putWithToken<IUpdatePostRes>("/post", post);
    return res;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const savePost = async (post: ICreatePost) => {
  try {
    const res = await postWithToken<ICreatePostRes>("/post", post);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async (post: IUpdatePost) => {
  try {
    const res = await putWithToken<IUpdatePostRes>("/post", post);
    return res;
  } catch (error) {
    console.log(error);
  }
};
