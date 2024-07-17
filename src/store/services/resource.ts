import { createApi } from "@reduxjs/toolkit/query/react";
import cfg from "~/config";
import {
  IResourceCreate,
  IResourceCreateResponse,
  IResourceDeleteResponse,
  IResourceResponse,
  IResourceUpdate,
  IResourceUpdateResponse,
} from "~/interfaces/resource";
import { ISearchResponse } from "~/interfaces/search";
import { axiosBaseQuery } from "~/util/httpQuery";

const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: cfg.env.API_URL }),
  tagTypes: ["Resources", "SearchPost"],
  endpoints: (builder) => ({
    getResources: builder.query<IResourceResponse, string>({
      query: (s) => ({ url: s }),
      providesTags: (result, error, arg) => [{ type: "Resources", id: arg }],
    }),
    createResource: builder.mutation<IResourceCreateResponse, IResourceCreate>({
      query: (data) => {
        console.log(`file: resource.ts:30 > data:`, data);
        return {
          url: "/resources",
          method: "POST",
          data: data,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
    }),
    updateResource: builder.mutation<IResourceUpdateResponse, IResourceUpdate>({
      query: (data) => {
        return {
          url: "/resources",
          data: data,
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
    }),
    deleteResource: builder.mutation<IResourceDeleteResponse, { id: string }>({
      query: (data) => {
        return {
          url: `/resources/${data.id}`,
          method: "DELETE",
        };
      },
    }),
    search: builder.query<ISearchResponse, string>({
      query: (s) => ({ url: s }),
      providesTags: (result, error, arg) => [{ type: "SearchPost", id: arg }],
    }),
  }),
});

export const {
  useGetResourcesQuery,
  useCreateResourceMutation,
  useUpdateResourceMutation,
  useDeleteResourceMutation,
  useSearchQuery,
} = api;
export default api;
