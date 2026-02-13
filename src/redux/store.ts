import { configureStore, combineReducers } from "@reduxjs/toolkit";

import taskReducer from "./tasks/slice";
import filterReducer from "./filters/slice";
import undoReducer from "./undo/slice";
import themeReducer from "./theme/slice";

import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "todo_v1", 
  storage,
  whitelist: ["tasks", "filter", "theme"], 
};

const rootReducer = combineReducers({
  tasks: taskReducer,
  filter: filterReducer,
  undo: undoReducer,
  theme: themeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
