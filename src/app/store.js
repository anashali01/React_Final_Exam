import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlicer.js"
import userReducer from "../features/users/userSlice.js";

const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer
    }
})

export default store;