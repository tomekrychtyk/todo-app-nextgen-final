import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ITodo, ITodosState, TodoStatus } from './interfaces';

const initialState: ITodosState = {
  items: [],
  selectedStatus: '',
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

    setSelectedStatusFilter(
      state,
      { payload }: PayloadAction<{ status: string | undefined }>
    ) {
      if (payload.status !== undefined) {
        state.selectedStatus = payload.status;
      }
    },
  },
});

export const {
  receivedTodos,
  addTodo,
  removeTodo,
  editTodo,
  setStatus,
  updateId,
  setSelectedStatusFilter,
} = todosSlice.actions;
export default todosSlice.reducer;
