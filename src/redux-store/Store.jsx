import { configureStore } from '@reduxjs/toolkit';
import UserInfoReducer from './slices/UserInfo';

const Store = configureStore({
    reducer:{
        userdata:UserInfoReducer
    }
})

export default Store;