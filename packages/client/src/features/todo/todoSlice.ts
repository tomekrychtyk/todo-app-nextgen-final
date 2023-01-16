import { PayloadAction, createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { ITodo, ITodosState } from './interfaces';

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

export const { receivedTodos, addTodo, removeTodo } = todosSlice.actions;
export default todosSlice.reducer;
