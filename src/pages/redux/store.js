import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./features/userSlice";
import orderSlice from "./features/orderSlice";

export const store = configureStore({
    reducer:{
        auth:authSlice,
        order:orderSlice,
    }
})