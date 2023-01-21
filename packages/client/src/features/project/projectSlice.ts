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
    const summary: Record<
      string,
      { name: string; rundown?: { [key: string]: number | undefined } }
    > = {};

    state.projects.items.forEach((project) => {
      summary[project._id] = {
        name: project.name,
      };
    });

    for (const todo of state.todos.items) {
      const project = todo.project;
      if (project) {
        const projectSummary = summary[project._id];
        if (projectSummary) {
          const projectSummaryRundown = projectSummary.rundown;
          if (projectSummaryRundown) {
            if (projectSummaryRundown[todo.status]) {
              projectSummaryRundown[todo.status] =
                (projectSummaryRundown[todo.status] || 0) + 1;
            } else {
              projectSummaryRundown[todo.status] = 1;
            }
          } else {
            projectSummary.rundown = {
              [todo.status]: 1,
            };
          }
        }
      }
    }

    Object.entries(summary).forEach((item) => {
      const [id, summaryItem] = item;
      if (summaryItem.rundown) {
        let totalDone = 0;
        let total = 0;
        for (let status in summaryItem.rundown) {
          if (status === 'DONE') {
            totalDone += summaryItem.rundown[status] || 0;
          }
          total += summaryItem.rundown[status] || 0;
        }
        summaryItem.rundown.totalDone = totalDone;
        summaryItem.rundown.total = total;
        if (total) {
          summaryItem.rundown.donePercent = (totalDone * 100) / total;
          summaryItem.rundown.todoPercent =
            100 - summaryItem.rundown.donePercent;
        }
      }
    });

    return summary;
  }
);

export const { receivedProjects, addProject } = projectSlice.actions;
export default projectSlice.reducer;
