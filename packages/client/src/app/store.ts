import { configureStore } from '@reduxjs/toolkit';
import { todosApi } from '@/features/todo/todoApi';
import todosReducer from '../features/todo/todoSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    [todosApi.reducerPath]: todosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todosApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
