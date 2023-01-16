import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITodo, TodoInput, TodoStatus } from './interfaces';

const apiUrl = import.meta.env.VITE_API_URL;

export const todosApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  endpoints: (builder) => ({
    getTodos: builder.query<ITodo[], void>({
      query: () => ({
        url: 'todo',
      }),
    }),
    addNewTodo: builder.mutation({
      query: (payload: TodoInput) => ({
        url: 'todo',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    deleteTodo: builder.mutation({
      query: (payload: { _id: string }) => ({
        url: 'todo',
        method: 'DELETE',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    editTodo: builder.mutation({
      query: (payload: ITodo) => ({
        url: 'todo',
        method: 'PATCH',
        body: { _id: '123' },
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    updateStatus: builder.mutation({
      query: ({ _id, status }: { _id: string; status: TodoStatus }) => ({
        url: 'todo/status',
        method: 'PATCH',
        body: { _id, status },
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddNewTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
  useUpdateStatusMutation,
} = todosApi;
