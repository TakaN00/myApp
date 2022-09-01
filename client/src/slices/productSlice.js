import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const getProducts = createAsyncThunk('products/getProducts', async(data,{rejectWithValue})=>{
    try {
        const res = await axios.get('/api/v1/products')
        return res.data
    } catch (error) {
        return rejectWithValue(
            error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message
        )
    }
})

export const addProduct = createAsyncThunk('products/addProduct', async(data,{rejectWithValue})=>{
    try {
        const form = new FormData();
        form.append('img',data.file)
        form.append('title',data.title)
        form.append('desc',data.desc)
        form.append('category',data.category)
        form.append('subcategory',data.subcategory)
        form.append('price',data.price)
        const res = await axios.post('/api/v1/products/addProduct',form, {
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

export const deleteProduct = createAsyncThunk('products/deleteProduct', async(productID,{rejectWithValue, dispatch})=>{
    try {
        await axios.delete(`/api/v1/products/${productID}`, {
            headers :{token:localStorage.getItem('token')}
        })
        return dispatch(getProducts())
    } catch (error) {
        return rejectWithValue(
            error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message
        )
    }
})

export const updateProduct = createAsyncThunk('products/updateProduct', async(data,{rejectWithValue, dispatch})=>{
    try {
        await axios.put(`/api/v1/products/${data.id}`,data, {
            headers :{token:localStorage.getItem('token')}
        })
        return dispatch(getProducts())
    } catch (error) {
        return rejectWithValue(
            error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message
        )
    }
})

export const updateProductImage = createAsyncThunk('products/updateProductImage', async(data,{rejectWithValue, dispatch})=>{
    try {
        const form = new FormData()
        form.append('img',data.file)
        await axios.put(`/api/v1/products/image/${data.id}`,form, {
            headers :{token:localStorage.getItem('token')}
        })
        return dispatch(getProducts())
    } catch (error) {
        return rejectWithValue(
            error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message
        )
    }
})


const productSlice = createSlice({
    name: 'products',
    initialState: {
        productList:[],
        errors:null,
        loading:false
    },
    extraReducers:{
        [getProducts.pending]:(state)=>{
            state.loading = true
        },
        [getProducts.fulfilled]:(state,action)=>{
            state.loading = false
            state.productList = action.payload
            state.errors = null
        },
        [getProducts.rejected]:(state,action)=>{
            state.loading = false
            state.errors = action.payload
        },
    }

})

export default productSlice.reducer