import categoryReducer, {
  receivedCategories,
  getCategoriesSummary,
} from './categorySlice';
import { ICategory, ICategoriesState } from './interfaces';
import { ITodosState, ITodo, TodoStatus } from '../todo/interfaces';
import { RootState } from '@/app/store';

const categories = [
  {
    _id: 'c1',
    name: 'Web Development',
  },
  {
    _id: 'c2',
    name: 'Professional growth',
  },
  {
    _id: 'c3',
    name: 'Self-improvment',
  },
  {
    _id: 'c4',
    name: 'Home duties',
  },
];

describe('categories reducer', () => {
  it('should return the initial state when passed an empty action', () => {
    const initialState = undefined;
    const action = { type: '' };
    const result = categoryReducer(initialState, action);
    expect(result).toEqual({ items: [], selectedFilter: '' });
  });

  it('should received categories and put the into state', () => {
    const initialState = undefined;
    const action = receivedCategories(categories);
    const result = categoryReducer(initialState, action);

    expect(result.items.length).toEqual(4);
    categories.forEach((category) => {
      const found = result.items.find((item) => item._id === category._id);
      expect(found).toBeDefined();
    });
  });
});

describe('selectors', () => {
  describe('getCategoriesSummary', () => {
    beforeEach(() => {
      getCategoriesSummary.resetRecomputations();
    });

    it('should return only one "Uncategorized" category when given no categories', () => {
      const categoryState: ICategoriesState = {
        items: [],
        selectedFilter: '',
      };
      const todosState: ITodosState = {
        selectedStatus: '',
        items: [],
      };

      const result = getCategoriesSummary({
        categories: categoryState,
        todos: todosState,
      } as RootState);

      expect(result).toEqual({
        uncategorized: {
          name: 'Uncategorized',
          counter: 0,
        },
      });
    });

    it('should return correctly computed categories with todo counted', () => {
      const categoryState: ICategoriesState = {
        items: [
          {
            name: 'Web',
            _id: 'c1',
          },
        ],
        selectedFilter: '',
      };
      const todosState: ITodosState = {
        selectedStatus: '',
        items: [
          {
            _id: 't1',
            category: {
              _id: 'c1',
              name: 'Web',
            },
            title: 'Todo 1',
            status: TodoStatus.inProgress,
          },
          {
            _id: 't2',
            category: {
              _id: 'c1',
              name: 'Web',
            },
            title: 'Todo 2',
            status: TodoStatus.inProgress,
          },
          {
            _id: 't3',
            category: {
              _id: '',
              name: '',
            },
            title: 'Todo 3',
            status: TodoStatus.inProgress,
          },
        ],
      };

      const result = getCategoriesSummary({
        categories: categoryState,
        todos: todosState,
      } as RootState);

      expect(result).toEqual({
        uncategorized: {
          name: 'Uncategorized',
          counter: 1,
        },
        c1: {
          name: 'Web',
          counter: 2,
        },
      });
    });

    it('should not compute again with the same state', () => {
      const categoryState: ICategoriesState = {
        items: [],
        selectedFilter: '',
      };
      const todosState: ITodosState = {
        items: [],
        selectedStatus: '',
      };

      const input = {
        categories: categoryState,
        todos: todosState,
      } as RootState;

      getCategoriesSummary(input);
      expect(getCategoriesSummary.recomputations()).toEqual(1);
      getCategoriesSummary(input);
      getCategoriesSummary(input);
      getCategoriesSummary(input);
      getCategoriesSummary(input);
      expect(getCategoriesSummary.recomputations()).toEqual(1);
    });

    it('should recompute if the state changed', () => {
      const categoryState: ICategoriesState = {
        items: [],
        selectedFilter: '',
      };
      const todosState: ITodosState = {
        selectedStatus: '',
        items: [],
      };

      const input = {
        categories: categoryState,
        todos: todosState,
      } as RootState;

      getCategoriesSummary(input);
      expect(getCategoriesSummary.recomputations()).toEqual(1);

      input.categories.items.push({ _id: 'c5', name: 'Cat 5' });
      getCategoriesSummary({ ...input });

      expect(getCategoriesSummary.recomputations()).toEqual(2);
    });
  });
});
