import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './reducers/usersReducer'

export const store = configureStore({
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    reducer: {
        usersPage: usersReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch