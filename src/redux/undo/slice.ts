import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "../tasks/slice";

interface UndoState {
  lastDeleted: Task | null;
}

const initialState: UndoState = {
  lastDeleted: null,
};

const undoSlice = createSlice({
  name: "undo",
  initialState,
  reducers: {
    setLastDeleted(state, action: PayloadAction<Task>) {
      state.lastDeleted = action.payload;
    },
    clearLastDeleted(state) {
      state.lastDeleted = null;
    },
  },
});

export const { setLastDeleted, clearLastDeleted } = undoSlice.actions;
export default undoSlice.reducer;
