import { postWithToken } from "~/util/httpRequest";

interface IUploadImageRes {
  url: string;
}

export const uploadImage = async (
  image: FormData,
): Promise<IUploadImageRes | undefined> => {
  try {
    const res = await postWithToken<IUploadImageRes>("/upload", image);
    return res;
  } catch (error) {
    console.log(error);
  }
};
