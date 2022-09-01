import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const getCart = createAsyncThunk('cart/getCart', async(data,{rejectWithValue})=>{
    try {
        const res = await axios.get('/api/v1/cart', {
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

export const addToCart = createAsyncThunk('cart/addToCart', async(data,{rejectWithValue, dispatch})=>{
    try {
        await axios.put("/api/v1/cart/addtocart", data, {
            headers :{token:localStorage.getItem('token')}
        })
        return dispatch(getCart())
    } catch (error) {
        return rejectWithValue(
            error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message
        )
    }
})

export const removeCart = createAsyncThunk('cart/removeCart', async(data,{rejectWithValue, dispatch})=>{
    try {
        await axios.put("/api/v1/cart/removefromcart", data, {
            headers :{token:localStorage.getItem('token')}
        })
        return dispatch(getCart())
    } catch (error) {
        return rejectWithValue(
            error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message
        )
    }
})

export const deleteCart = createAsyncThunk('cart/deleteCart', async(data,{rejectWithValue, dispatch})=>{
    try {
        await axios.put("/api/v1/cart/deleteCart", data, {
            headers :{token:localStorage.getItem('token')}
        })  
        return dispatch(getCart())
    } catch (error) {
        return rejectWithValue(
            error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message
        )
    }
})

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartList:[],
        errors:null,
    },
    extraReducers:{
        [getCart.fulfilled]:(state,action)=>{
            state.cartList = action.payload[0].products 
            state.errors = null
        },
        [getCart.rejected]:(state,action)=>{
            state.errors = action.payload
        },
    }

})

export default cartSlice.reducer