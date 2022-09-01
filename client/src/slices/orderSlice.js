import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'


export const createOrder = createAsyncThunk ('order/createOrder', async (data,{rejectWithValue})=>{
    try {
        const res = await axios.post('/api/v1/orders', data, {
            headers :{token:localStorage.getItem('token')}})
        return res.data
    } catch (error) {
        return rejectWithValue(
            error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message
        )
    }
})

export const getOrderDetails = createAsyncThunk('order/getOrderDetails', async(data,{rejectWithValue})=>{
    try {
        const res = await axios.get(`/api/v1/orders/${data}`, {
            headers :{token:localStorage.getItem('token')}
        })
        return res.data
    } catch (error) {
        return rejectWithValue(
            error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message
        )
    }
})

export const getAllOrders = createAsyncThunk ('order/getAllOrders', async (data,{rejectWithValue})=>{
    try {
        const res = await axios.get('/api/v1/orders/allorders', {
            headers :{token:localStorage.getItem('token')}
        })
        return res.data
    } catch (error) {
        return rejectWithValue(
            error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message
        )
    }
})

export const getOrders = createAsyncThunk ('order/getOrders', async (data,{rejectWithValue})=>{
    try {
        const res = await axios.get('/api/v1/orders/orderlist', {
            headers :{token:localStorage.getItem('token')}
        })
        return res.data
    } catch (error) {
        return rejectWithValue(
            error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message
        )
    }
})

export const deleteOrder = createAsyncThunk ('order/deleteOrder', async (data,{rejectWithValue, dispatch})=>{
    try {
        await axios.delete(`/api/v1/orders/${data}`, {
            headers :{token:localStorage.getItem('token')}
        })
        return dispatch(getAllOrders())
    } catch (error) {
        return rejectWithValue(
            error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message
        )
    }
})

export const updateOrder = createAsyncThunk ('order/updateOrder', async (data,{rejectWithValue, dispatch})=>{
    try {
        await axios.put(`/api/v1/orders/${data.id}`,data, {
            headers :{token:localStorage.getItem('token')}
        })
        return dispatch(getAllOrders())
    } catch (error) {
        return rejectWithValue(
            error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message
        )
    }
})

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orderList:[],
        orderDetails:[],
        errors:null,
        loading:false
    },
    extraReducers:{
        [getAllOrders.pending]:(state)=>{
            state.loading = true
        },
        [getAllOrders.fulfilled]:(state,action)=>{
            state.loading = false
            state.orderList = action.payload
            state.errors = null
        },
        [getAllOrders.rejected]:(state,action)=>{
            state.loading = false
            state.errors = action.payload
        },
        [getOrderDetails.pending]:(state)=>{
            state.loading = true
        },
        [getOrderDetails.fulfilled]:(state,action)=>{
            state.loading = false
            state.orderDetails = action.payload
            state.errors = null
        },
        [getOrderDetails.rejected]:(state,action)=>{
            state.loading = false
            state.errors = action.payload
        },
        [getOrders.pending]:(state)=>{
            state.loading = true
        },
        [getOrders.fulfilled]:(state,action)=>{
            state.loading = false
            state.orderList = action.payload
            state.errors = null
        },
        [getOrders.rejected]:(state,action)=>{
            state.loading = false
            state.errors = action.payload
        },
    }

})

export default orderSlice.reducer