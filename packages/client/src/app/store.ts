import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api';
import todosReducer from '../features/todo/todoSlice';
import categoryReducer from '../features/category/categorySlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    categories: categoryReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
