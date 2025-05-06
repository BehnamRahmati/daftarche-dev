import { configureStore } from '@reduxjs/toolkit'
import clipboardsReducer from './features/clipboards/clipboard-slice'
import filesReducer from './features/files/file-slice'
import userReducer from './features/user/user-slice'

export const store = configureStore({
	reducer: { clipboards: clipboardsReducer, user: userReducer, files: filesReducer },
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
