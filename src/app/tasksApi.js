import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = (
  import.meta.env.VITE_API_BASE || "http://localhost:5174"
).replace(/\/$/, "");

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/tasks",
      providesTags: (result) =>
        result
          ? [
              { type: "Tasks", id: "LIST" },
              ...result.map((t) => ({ type: "Tasks", id: t.id })),
            ]
          : [{ type: "Tasks", id: "LIST" }],
    }),

    addTask: builder.mutation({
      query: (task) => ({
        url: "/tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),

    updateTask: builder.mutation({
      query: ({ id, patch }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (res, err, arg) => [
        { type: "Tasks", id: arg.id },
        { type: "Tasks", id: "LIST" },
      ],
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (res, err, id) => [
        { type: "Tasks", id },
        { type: "Tasks", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
