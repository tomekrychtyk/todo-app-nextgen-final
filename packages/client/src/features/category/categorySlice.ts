import { PayloadAction, createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { ICategoriesState, ICategory } from './interfaces';

const initialState: ICategoriesState = {
  items: [],
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    receivedCategories(state, action: PayloadAction<ICategory[]>) {
      state.items = action.payload;
    },
  },
});

export const getCategoriesSummary = createSelector(
  (state: RootState) => state,
  (state) => {
    const summary: { [id: string]: { name: string; counter: number } } = {
      uncategorized: {
        name: 'Uncategorized',
        counter: 0,
      },
    };

    Object.entries(state.categories.items).forEach(([_, category]) => {
      summary[category._id] = {
        name: category.name,
        counter: 0,
      };
    });

    for (const todo of state.todos.items) {
      const category = todo.category;
      if (category) {
        if (category._id === undefined || category._id === '') {
          summary['uncategorized'].counter++;
          continue;
        }

        if (summary[category._id] !== undefined) {
          summary[category._id].counter++;
        } else {
          summary[category._id] = {
            counter: 1,
            name: category.name,
          };
        }
      }
    }

    return summary;
  }
);

export const { receivedCategories } = categorySlice.actions;
export default categorySlice.reducer;
