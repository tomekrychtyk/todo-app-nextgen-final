import { IProject } from '../project/interfaces';
import { ITodo, TodoInput, TodoStatus } from './interfaces';
import { apiSlice } from '@/app/api';

export const todosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query<ITodo[], void>({
      query: () => ({
        url: 'todo',
      }),
    }),
    addNewTodo: builder.mutation<ITodo, TodoInput>({
      query: (payload: TodoInput) => ({
        url: 'todo',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    deleteTodo: builder.mutation<ITodo, { _id: string }>({
      query: (payload: { _id: string }) => ({
        url: 'todo',
        method: 'DELETE',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    editTodo: builder.mutation<
      ITodo,
      { _id: string; title: string; project: IProject | undefined }
    >({
      query: ({
        _id,
        title,
        project,
      }: {
        _id: string;
        title: string;
        project: IProject | undefined;
      }) => ({
        url: 'todo',
        method: 'PATCH',
        body: { _id, title, project },
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    updateStatus: builder.mutation<ITodo, { _id: string; status: string }>({
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
