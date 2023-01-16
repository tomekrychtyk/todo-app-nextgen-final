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
      { payload: { _id, title, status, category } }: PayloadAction<ITodo>
    ) {
      state.items = [...state.items, { _id, title, status, category }];
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

    updateId(
      state,
      { payload: { _id, tmpId } }: PayloadAction<{ _id: string; tmpId: string }>
    ) {
      state.items.forEach((todo) => {
        if (todo._id === tmpId) {
          todo._id = _id;
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
    const results: { [id: string]: { name: string; counter: number } } = {
      uncategorized: {
        name: 'Uncategorized',
        counter: 0,
      },
    };

    for (const todo of items) {
      const category = todo.category;

      if (category._id === undefined) {
        results['uncategorized'].counter++;
        continue;
      }

      if (results[category._id] !== undefined) {
        results[category._id].counter++;
      } else {
        results[category._id] = {
          counter: 1,
          name: category.name,
        };
      }
    }

    return results;
  }
);

export const {
  receivedTodos,
  addTodo,
  removeTodo,
  editTodo,
  setStatus,
  updateId,
} = todosSlice.actions;
export default todosSlice.reducer;
