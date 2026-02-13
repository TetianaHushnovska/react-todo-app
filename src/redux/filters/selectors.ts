import { RootState } from "../store";

export const selectFilter = (state: RootState) => state.filter.status;

export const selectVisibleTasks = (state: RootState) => {
  const tasks = state.tasks.items;
  const { status, query = "" } = state.filter;

  const q = query.trim().toLowerCase();

  return tasks
    .filter((t) => {
      if (status === "complete") return t.completed;
      if (status === "incomplete") return !t.completed;
      return true; 
    })
    .filter((t) => {
      if (!q) return true;
      return t.title.toLowerCase().includes(q);
    });
};
