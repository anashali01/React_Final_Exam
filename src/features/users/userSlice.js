import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../api/instance";

export const createUser = createAsyncThunk('users/createUser', async (userData, { rejectWithValue }) => {
    try {
        userData.role = "user";
        const response = await instance.post('/users', userData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const getUsers = createAsyncThunk('users/getUsers', async (_, { rejectWithValue }) => {
    try {
        const response = await instance.get('/users');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})

const userSlicer = createSlice({
    name: "users",
    initialState: {
        users: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.users.push(action.payload);
        })
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload;
        }
        )
    }
})

export default userSlicer.reducer;