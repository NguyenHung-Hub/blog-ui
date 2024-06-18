import Cookies from "js-cookie";
import axios, { AxiosError, AxiosResponse } from "axios";
import axiosRetry from "axios-retry";

const httpRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 1000,
});

axiosRetry(httpRequest, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 300;
  },
});

const httpRequest2 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const get = async <T>(path: string, options = {}): Promise<T> => {
  const res = await httpRequest2.get(path, options);
  return res.data;
};

export const post = async (path: string, data: any) => {
  try {
    const res = await httpRequest2.post(path, data);
    return res.data;
  } catch (error) {
    console.log(`file: httpRequest.ts:72 > error:`, error);
  }
};
export const postWithToken = async <T>(
  path: string,
  data: any,
): Promise<T | undefined> => {
  try {
    const res = await httpRequest.post(path, data, {});
    return res.data;
  } catch (error) {
    console.log(`file: httpRequest.ts:39 > error:`, error);
  }
};

export const putWithToken = async <T>(
  path: string,
  data: any,
): Promise<T | undefined> => {
  try {
    const res = await httpRequest.put(path, data, {});
    return res.data;
  } catch (error) {
    console.log(`file: httpRequest.ts:54 > error:`, error);
  }
};

export const postWithToken2 = async <T>(
  path: string,
  data: any,
  retries: number = 3,
  backoff: number = 400,
): Promise<T | undefined> => {
  try {
    const res = await httpRequest.post(path, data, {});
    console.log(`file: httpRequest.ts:55 > res:`, res);
    return res.data;
  } catch (err) {
    console.log(`file: httpRequest.ts:66 > err:`, err, retries);
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, backoff));
      return postWithToken2(path, data, retries - 1);
    } else {
      throw err;
    }
  }
};

function getTokenInStorage(): string {
  // const token = localStorage.getItem("access_token");
  const token = Cookies.get("access_token");
  if (token) {
    return token;
  }

  return "";
}

function getLocalSession(): string {
  const session = Cookies.get("session_id");
  if (session) {
    return session;
  }
  return "";
}

function getToken() {
  Cookies.remove("access_token");
  return httpRequest2.post("/tokens/refresh", {
    session_id: getLocalSession(),
  });
}

httpRequest.interceptors.request.use(
  (config) => {
    const token = getTokenInStorage();
    console.log("Attack token: ", token);
    const str = ["Bearer", token].join(" ");
    config.headers.Authorization = str;
    return config;
  },
  (err) => {
    console.log(`file: httpRequest.ts:54 > err:`, err);
    return err;
  },
);
//https: stackoverflow.com/questions/47216452/how-to-handle-401-authentication-error-in-axios-and-react
httpRequest.interceptors.response.use(
  (response) => {
    console.log(
      `file: httpRequest.ts:114 > response:`,
      response,
      response.data,
      response.statusText,
    );
    // if (response.status == 401) {
    //     return getToken().then((res) => {
    //         const { access_token } = res.data;
    //         Cookies.set("access_token", access_token);

    //         const cfg = response.config;
    //         cfg.headers.Authorization = access_token;
    //         console.log("new access token: ", access_token);
    //         return httpRequest(cfg);
    //     });
    // }
    return response;
  },
  (error) => {
    console.log(`file: httpRequest.ts:129 > error:`, error);
    const { response, config } = error;
    const status = response?.status;
    if (status == 401 || status == 403) {
      getToken().then((res) => {
        const { access_token } = res.data;
        config.headers.Authorization = access_token;
        console.log("new access token: ", access_token);
        Cookies.set("access_token", access_token);
        // return httpRequest(config);
      });
    }

    // return error;
    return Promise.reject(error);
  },
);

export { httpRequest2 };

export default httpRequest;
