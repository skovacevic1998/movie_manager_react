import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import movieReducer from "./movieSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [],
};

const persistedMovieReducer = persistReducer(persistConfig, movieReducer);

const store = configureStore({
  reducer: {
    movies: persistedMovieReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PURGE",
        ],
      },
    }),
});

export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;
