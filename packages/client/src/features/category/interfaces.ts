export interface ICategory {
  _id: string;
  name: string;
}
export interface ICategoryInput {
  name: string;
}

export interface ICategoriesState {
  items: ICategory[];
  selectedFilter: string;
}
