import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import { classApi } from "../services/selectclass"


export const store = configureStore({
    reducer: {
      [classApi.reducerPath]: classApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(classApi.middleware),
  });

  setupListeners(store.dispatch)