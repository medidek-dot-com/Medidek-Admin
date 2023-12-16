import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore, FLUSH } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from './authSlice';

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
    auth: authSlice
}));

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [REHYDRATE, PAUSE, PERSIST, REGISTER, PURGE, FLUSH]
        }
    })
});

const persistor = persistStore(store);

export { store, persistor };