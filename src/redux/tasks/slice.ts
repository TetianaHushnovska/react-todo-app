import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

export type Task = {
    id: string;
    title: string;
    completed: boolean;
    createdAt: number;
};

type TasksState = {
    items: Task[];
};

const initialState: TasksState = {
    items: [],
};

const tasksSlie = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: {
            reducer(state, action: PayloadAction<Task>) {
                state.items.unshift(action.payload);
            },
            prepare(title: string) {
                const trimmed = title.trim();
                return {
                    payload: {
                        id: nanoid(),
                        title: trimmed,
                        completed: false,
                        createdAt: Date.now()
                    } satisfies Task,
                }
            }
        },

        toggleTask (state, action: PayloadAction<string>) {
                const task = state.items.find((t) => t.id === action.payload);
                if (!task) return;
                task.completed = !task.completed;
        },
        
        deleteTask(state, action: PayloadAction<string>) {
            state.items = state.items.filter((t) => t.id !== action.payload);
        },

        editTask(state, action: PayloadAction<{ id: string; title: string }>) {
            const { id, title } = action.payload;
            const task = state.items.find((t) => t.id === id);
            if (!task) return;

            const trimmed = title.trim();
            if (!trimmed) return;
            task.title = trimmed;
        },

        restoreTask(state, action: PayloadAction<Task>) {
            const exists = state.items.some((t) => t.id === action.payload.id);
            if (!exists) state.items.unshift(action.payload);
        },

    }
});

export const { addTask, toggleTask, deleteTask, editTask, restoreTask } = tasksSlie.actions;
export default tasksSlie.reducer;