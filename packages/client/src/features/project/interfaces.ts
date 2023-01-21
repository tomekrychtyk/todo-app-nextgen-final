export interface IProject {
  _id: string;
  name: string;
}

export type IProjectInput = Omit<IProject, '_id'>;

export interface IProjectsState {
  items: IProject[];
  selectedFilter: '';
}
