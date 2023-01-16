import { PayloadAction, createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { ITodo, ITodosState, TodoStatus } from './interfaces';

const initialState: ITodosState = {
  items: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    receivedTodos(state, action: PayloadAction<ITodo[]>) {
      state.items = action.payload;
    },

    addTodo(
      state,
      { payload: { _id, title, status, categories } }: PayloadAction<ITodo>
    ) {
      state.items = [...state.items, { _id, title, status, categories }];
    },

    removeTodo(state, { payload: { _id } }: PayloadAction<{ _id: string }>) {
      state.items = state.items.filter((todo) => todo._id !== _id);
    },

    editTodo(
      state,
      { payload: { _id, title } }: PayloadAction<{ _id: string; title: string }>
    ) {
      state.items.forEach((todo) => {
        if (todo._id === _id) {
          todo.title = title;
        }
      });
    },

    setStatus(
      state,
      {
        payload: { _id, status },
      }: PayloadAction<{ _id: string; status: TodoStatus }>
    ) {
      state.items.forEach((todo) => {
        if (todo._id === _id) {
          todo.status = status;
        }
      });
    },
  },
});

export const getCategoriesSummary = createSelector(
  (state: RootState) => state.todos.items,
  (items) => {
    const results: { [id: string]: { name: string; counter: number } } = {};
    for (const todo of items) {
      for (const cat of todo.categories) {
        if (results[cat.id]) {
          results[cat.id].counter++;
        } else {
          results[cat.id] = {
            name: cat.name,
            counter: 1,
          };
        }
      }
    }

    return results;
  }
);

export const { receivedTodos, addTodo, removeTodo, editTodo, setStatus } =
  todosSlice.actions;
export default todosSlice.reducer;
