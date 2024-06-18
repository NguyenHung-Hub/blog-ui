import { ILoginRes } from "~/interfaces/user";
import { httpRequest2 } from "~/util/httpRequest";

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<ILoginRes | undefined> => {
  try {
    const res = await httpRequest2.post("/login", { email, password });
    return res.data;
  } catch (error) {
    console.log(`file: user.ts:8 > error:`, error);
  }
};
