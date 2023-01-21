import { ICategory } from '../category/interfaces';
import { IProject } from '../project/interfaces';

export enum TodoStatus {
  toDo = 'TO DO',
  inProgress = 'IN PROGRESS',
  done = 'DONE',
}

export interface ITodo {
  _id: string;
  title: string;
  status: TodoStatus;
  category: ICategory;
  project?: IProject;
}

export type TodoInput = Omit<ITodo, '_id'>;

export interface ITodosState {
  items: ITodo[];
  selectedStatus: string;
}

export type TodoRundown = {
  ['TO DO']?: number;
  DONE?: number;
  ['IN PROGRESS']?: number;
};
