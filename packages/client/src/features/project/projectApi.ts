import { apiSlice } from '@/app/api';
import { IProject, IProjectInput } from './interfaces';

export const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addNewProject: builder.mutation<IProject, IProjectInput>({
      query: (payload: IProjectInput) => ({
        url: 'project',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),

    getProjects: builder.query<IProject[], void>({
      query: () => ({
        url: 'project',
      }),
    }),
  }),
});

export const { useAddNewProjectMutation, useGetProjectsQuery } = projectApi;
