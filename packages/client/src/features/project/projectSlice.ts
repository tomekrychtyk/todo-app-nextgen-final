import { PayloadAction, createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { IProject, IProjectsState } from './interfaces';
import { TodoRundown } from '../todo/interfaces';

const initialState: IProjectsState = {
  items: [],
  selectedFilter: '',
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    receivedProjects(state, action: PayloadAction<IProject[]>) {
      state.items = action.payload;
    },

    addProject(state, { payload: { _id, name } }: PayloadAction<IProject>) {
      state.items = [...state.items, { _id, name }];
    },

    updateId(
      state,
      { payload: { _id, tmpId } }: PayloadAction<{ _id: string; tmpId: string }>
    ) {
      state.items.forEach((project) => {
        if (project._id === tmpId) {
          project._id = _id;
        }
      });
    },
  },
});

export const getProjectsSummary = createSelector(
  (state: RootState) => state,
  (state) => {
    const summary: Record<string, { name: string; rundown?: TodoRundown }> = {};

    state.projects.items.forEach((project) => {
      summary[project._id] = {
        name: project.name,
      };
    });

    for (const todo of state.todos.items) {
      const project = todo.project;
      if (project) {
        if (summary[project._id] && summary[project._id].rundown) {
          let total = summary[project._id].rundown?.[todo.status];
          if (total) {
            total += 1;
          } else {
            total = 1;
          }
          summary[project._id].rundown = {
            [todo.status]: total,
          };
        } else {
          summary[project._id].rundown = {
            [todo.status]: 1,
          };
        }
      }
    }

    return summary;
  }
);

export const { receivedProjects, addProject } = projectSlice.actions;
export default projectSlice.reducer;
