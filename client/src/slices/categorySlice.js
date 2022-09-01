import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const getCategories = createAsyncThunk('category/getCategories', async(data,{rejectWithValue})=>{
    try {
        const res = await axios.get('/api/v1/categories')
        return res.data
    } catch (error) {
        return rejectWithValue(
            error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message
        )
    }
})

export const addCategory = createAsyncThunk('category/addCategory', async(data,{rejectWithValue, dispatch})=>{
    try {
        const form = new FormData();
        form.append('img',data.file)
        form.append('title',data.title)
        await axios.post('/api/v1/categories/addCategory',form, {
            headers :{token:localStorage.getItem('token')}
        })
        return dispatch(getCategories())
    } catch (error) {
        return rejectWithValue(
            error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message
        )
    }
})


export const deleteCategory = createAsyncThunk('category/deleteCategory', async(productID,{rejectWithValue, dispatch})=>{
    try {
        await axios.delete(`/api/v1/categories/${productID}`, {
            headers :{token:localStorage.getItem('token')}
        })
        return dispatch(getCategories())
    } catch (error) {
        return rejectWithValue(
            error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message
        )
    }
})

export const updateCategory = createAsyncThunk('category/updateCategory', async(data,{rejectWithValue, dispatch})=>{
    try {
        await axios.put(`/api/v1/categories/${data.id}`,data, {
            headers :{token:localStorage.getItem('token')}
        })
        return dispatch(getCategories())
    } catch (error) {
        return rejectWithValue(
            error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message
        )
    }
})

export const updateCategoryImage = createAsyncThunk('category/updateCategoryImage', async(data,{rejectWithValue, dispatch})=>{
    try {
        const form = new FormData()
        form.append('img',data.file)
        await axios.put(`/api/v1/categories/image/${data.id}`,form, {
            headers :{token:localStorage.getItem('token')}
        })
        return dispatch(getCategories())
    } catch (error) {
        return rejectWithValue(
            error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message
        )
    }
})

const categorySlice = createSlice ({
    name: 'category',
    initialState: {
        categoryState: "",
        categoryList:[],
        errors:null,
        loading:false
    },
    reducers : {
        selectCategory : (state,action)=>{
            state.categoryState = action.payload
        }
    },
    extraReducers:{
        [getCategories.pending]:(state)=>{
            state.loading = true
        },
        [getCategories.fulfilled]:(state,action)=>{
            state.loading = false
            state.categoryList = action.payload
            state.errors = null
        },
        [getCategories.rejected]:(state,action)=>{
            state.loading = false
            state.errors = action.payload
        },
    }
})

export default categorySlice.reducer
export const {selectCategory}=categorySlice.actions