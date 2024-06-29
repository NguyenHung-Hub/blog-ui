import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import cfg from "~/config";
import { IResourceResponse } from "~/interfaces/resource";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: cfg.env.API_URL }),
  tagTypes: ["Resources"],
  endpoints: (builder) => ({
    getResources: builder.query<IResourceResponse, string>({
      query: (s) => s,
      providesTags: (result, error, arg) =>
        result?.data
          ? [
              ...result?.data.map((item) => ({
                type: "Resources" as const,
                id: item._id,
              })),
              "Resources",
            ]
          : ["Resources"],
    }),
  }),
});

export const { useGetResourcesQuery } = api;
export default api;
