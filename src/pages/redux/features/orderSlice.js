import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";


export const newOrder = createAsyncThunk("order/newOrder", async ({ finalOrder, toast }, { rejectWithValue }) => {
    try {
        const response = await api.newOrder(finalOrder);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const getAllOrders = createAsyncThunk("order/getAllOrders", async (formValue, { rejectWithValue }) => {
    try {
        const response = await api.getAllOrders(formValue);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const deleteAnOrder = createAsyncThunk("order/deleteAnOrder", async (formValue, { rejectWithValue }) => {
    try {
        const response = await api.deleteAnOrder(formValue);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})
const orderSlice = createSlice({
    name: "order",
    initialState: {
        order: null,
        orders: [],
        filteredByDate: [],
        filteredBySearch: [],
        loading: true,
        viewOrder: null,
        error: "",
        openPopupMsg: false,
        confirmBtn:false,
    },
    reducers: {
        OpenPopupMsg: (state) => {
            state.openPopupMsg = !state.openPopupMsg;
        },
       handleViewOrder: (state, action) => {
            state.viewOrder = action.payload;
        },
        handleDeleteAnOrder: (state, action) => {
            const container = state.orders.filter((order) => order._id !== action.payload);
            state.orders = container;
            state.filteredByDate = container;
            state.filteredBySearch = container;
        },
        handleFilteredBySearch: (state, action) => {
            state.orders = action.payload;
        },
        handleFilteredByDates: (state, action) => {
            state.orders = action.payload;
        },
        handleFilteredByPrice: (state, action) => {
            state.orders = action.payload;
        },
        handleFilteredByTotalItems: (state, action) => {
            state.orders = action.payload;
        },
        toggleConfirmBtn:(state,action)=>{
            state.confirmBtn=action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(newOrder.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(newOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.order = action.payload;
            state.error = "";
        })
        builder.addCase(newOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        builder.addCase(getAllOrders.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getAllOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
            state.filteredByDate = action.payload;
            state.filteredBySearch = action.payload;
            state.error = "";
        })
        builder.addCase(getAllOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        builder.addCase(deleteAnOrder.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteAnOrder.fulfilled, (state, action) => {
            state.loading = false;
            // state.orders = action.payload;
            state.error = "";
        })
        builder.addCase(deleteAnOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
    }
})

export const { handleViewOrder,toggleConfirmBtn, handleDeleteAnOrder, handleFilteredBySearch, handleFilteredByDates, handleFilteredByPrice, handleFilteredByTotalItems,OpenPopupMsg } = orderSlice.actions;
export default orderSlice.reducer;