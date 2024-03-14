import { configureStore } from '@reduxjs/toolkit'
import entryInputCategoryReducer from './features/entryInput/entryInputCategorySlice'
// ...

const store = configureStore({
  reducer: {
    entryInputCategory: entryInputCategoryReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;