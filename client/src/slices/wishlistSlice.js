import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const getWishlist = createAsyncThunk('wishlist/getWishlist', async(data,{rejectWithValue})=>{
    try {
        const res = await axios.get('/api/v1/wishlist', {
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

export const addToWishlist = createAsyncThunk('wishlist/addToWishlist', async(data,{rejectWithValue, dispatch})=>{
    try {
        await axios.put("/api/v1/wishlist/addtowishlist", data, {
            headers :{token:localStorage.getItem('token')}
        })
        return dispatch(getWishlist())
    } catch (error) {
        return rejectWithValue(
            error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message
        )
    }
})

export const removeWishlist = createAsyncThunk('wishlist/removeWishlist', async(data,{rejectWithValue, dispatch})=>{
    try {
        await axios.put("/api/v1/wishlist/removefromwishlist", data, {
            headers :{token:localStorage.getItem('token')}
        })
        return dispatch(getWishlist())
    } catch (error) {
        return rejectWithValue(
            error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message
        )
    }
})

export const deleteWishlist = createAsyncThunk('wishlist/deleteWishlist', async(data,{rejectWithValue, dispatch})=>{
    try {
        await axios.put("/api/v1/wishlist/deletewishlist", data, {
            headers :{token:localStorage.getItem('token')}
        })  
        return dispatch(getWishlist())
    } catch (error) {
        return rejectWithValue(
            error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message
        )
    }
})

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        wishlist:[],
        errors:null,
    },
    extraReducers:{
        [getWishlist.fulfilled]:(state,action)=>{
            state.wishlist = action.payload[0].products 
            state.errors = null
        },
        [getWishlist.rejected]:(state,action)=>{
            state.errors = action.payload
        },
    }

})

export default wishlistSlice.reducer