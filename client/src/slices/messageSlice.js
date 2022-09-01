import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const newMessage = createAsyncThunk ('message/newMessage', async (data,{rejectWithValue})=>{
    try {
        const res = await axios.post('/api/v1/messages/', data)
        return res.data
    } catch (error) {
        return rejectWithValue(
            error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message
        )
    }
})

export const getMessages = createAsyncThunk('message/getMessages', async(data,{rejectWithValue})=>{
    try {
        const res = await axios.get('/api/v1/messages/', {
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

export const deleteMessage = createAsyncThunk('message/deleteMessage', async(messageID,{rejectWithValue, dispatch})=>{
    try {
        await axios.delete(`/api/v1/messages/${messageID}`, {
            headers :{token:localStorage.getItem('token')}
        })
        return dispatch(getMessages())
    } catch (error) {
        return rejectWithValue(
            error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message
        )
    }
})

export const updateMessage = createAsyncThunk('message/updateMessage', async(data,{rejectWithValue, dispatch})=>{
    try {
        await axios.put(`/api/v1/messages/${data.id}`,data, {
            headers :{token:localStorage.getItem('token')}
        })
        return dispatch(getMessages())
    } catch (error) {
        return rejectWithValue(
            error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message
        )
    }
})

const messageSlice = createSlice ({
    name: 'message',
    initialState: {
        messageList:[],
        errors:null,
        loading:false
    },
    extraReducers:{
        [getMessages.pending]:(state)=>{
            state.loading = true
        },
        [getMessages.fulfilled]:(state,action)=>{
            state.loading = false
            state.messageList = action.payload
            state.errors = null
        },
        [getMessages.rejected]:(state,action)=>{
            state.loading = false
            state.errors = action.payload
        },
    }
})

export default messageSlice.reducer