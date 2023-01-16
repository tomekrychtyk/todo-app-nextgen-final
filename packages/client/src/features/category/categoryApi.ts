import { apiSlice } from '@/app/api';
import { ICategory, ICategoryInput } from './interfaces';

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addNewCategory: builder.mutation<ICategory, ICategoryInput>({
      query: (payload: ICategoryInput) => ({
        url: 'category',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
  }),
});

export const { useAddNewCategoryMutation } = categoryApi;
