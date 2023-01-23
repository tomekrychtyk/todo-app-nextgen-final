import { PayloadAction, createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { ICategoriesState, ICategory } from './interfaces';

const initialState: ICategoriesState = {
  items: [],
  selectedFilter: '',
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    receivedCategories(state, action: PayloadAction<ICategory[]>) {
      state.items = action.payload;
    },

    addCategory(state, { payload: { _id, name } }: PayloadAction<ICategory>) {
      state.items = [...state.items, { _id, name }];
    },

    updateId(
      state,
      { payload: { _id, tmpId } }: PayloadAction<{ _id: string; tmpId: string }>
    ) {
      state.items.forEach((category) => {
        if (category._id === tmpId) {
          category._id = _id;
        }
      });
    },

    setSelectedCategoryFilter(
      state,
      { payload }: PayloadAction<{ _id: string }>
    ) {
      state.selectedFilter = payload._id;
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

export const {
  receivedCategories,
  addCategory,
  updateId,
  setSelectedCategoryFilter,
} = categorySlice.actions;
export default categorySlice.reducer;
