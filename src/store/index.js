import { createStore } from "redux";
import tasksReducer from "../reducers/tasks";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";

export const initialState = {
  tasks: [],
  goals: [],
  homeCalendarDate: "",
};

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: "hello",
    }),
  ],
};

const persistedReducer = persistReducer(persistConfig, tasksReducer);

export const configureStore = createStore(
  persistedReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(configureStore);
