import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../api/instance";

export const createProduct = createAsyncThunk('products/createProduct', async (productData, { rejectWithValue }) => {
    try {
        const response = await instance.post('/products', productData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const getProducts = createAsyncThunk('products/getProducts', async (_, { rejectWithValue }) => {
    try {
        const response = await instance.get('/products');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId, { rejectWithValue }) => {
    try {
        const response = await instance.delete(`/products/${productId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateProduct = createAsyncThunk('products/updateProduct', async (updateData, { rejectWithValue }) => {
    try {
        const { id } = updateData;
        const response = await instance.patch(`/products/${id}`, updateData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

const productSlicer = createSlice({
    name: "products",
    initialState: {
        products: [],
        editProduct: {}
    },
    reducers: {
        setEditProduct: (state, action) => {
            state.editProduct = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.products.push(action.payload);
        })
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        })
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload.id);
        })
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.products = state.products.map(product => {
                if (product.id === action.payload.id) {
                    return action.payload;
                }
                return product;
            })
        })
    }
});

export default productSlicer.reducer;
export const { setEditProduct } = productSlicer.actions;