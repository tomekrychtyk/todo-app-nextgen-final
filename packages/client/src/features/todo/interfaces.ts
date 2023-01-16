import { ICategory } from '../category/interfaces';

export interface ITodo {
  _id: string;
  title: string;
  status: string;
  categories: ICategory[];
}

export type TodoInput = Omit<ITodo, '_id'>;

export interface ITodosState {
  items: ITodo[];
}
