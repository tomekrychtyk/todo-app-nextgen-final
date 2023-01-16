import { ICategory } from '../category/interfaces';

export enum TodoStatus {
  toDo = 'TO DO',
  inProgress = 'IN PROGRESS',
  done = 'DONE',
}

export interface ITodo {
  _id: string;
  title: string;
  status: TodoStatus;
  categories: ICategory[];
}

export type TodoInput = Omit<ITodo, '_id'>;

export interface ITodosState {
  items: ITodo[];
}
