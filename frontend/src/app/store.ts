import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { usersReducer } from '../features/users/usersSlice';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import {postsReducer} from "../features/posts/postsSlice";
import {commentsReducer} from "../features/comments/commentsSlice";

const usersPersistConfig = {
    key: 'shop:users',
    storage,
    whitelist:['user'],
}

const rootReducer = combineReducers({
    posts: postsReducer,
    comments: commentsReducer,
    users: persistReducer(usersPersistConfig, usersReducer),
});
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persist = persistStore(store);