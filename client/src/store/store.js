import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import searchReducer from './SearchSlice'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import loyaltyPointsReducer from "./loyaltyPoints"

const rootReducer = combineReducers({ 
    auth: authReducer, 
    search: searchReducer,
    loyaltyPoints: loyaltyPointsReducer
});

const persistConfig = {
    key: 'root',
    version: '1',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);



const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export const persistor = persistStore(store);

export default store;