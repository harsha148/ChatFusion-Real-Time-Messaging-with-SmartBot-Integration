import { createSlice } from "@reduxjs/toolkit";
import { sendMessage } from "./MessageActions";

interface MessageState{
    loading:boolean,
}

const initialState:MessageState={
    loading:false
}

const MessageSlice = createSlice({
    name:'messages',
    initialState,
    reducers:{
    },
    extraReducers:(builder)=>{
        builder.addCase(sendMessage.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(sendMessage.rejected,(state,action)=>{
            state.loading = false
        })
        builder.addCase(sendMessage.fulfilled,(state,action)=>{
            state.loading=false
        })
    }
})

export const messageReducer = MessageSlice.reducer

const messageThunks = {
    sendMessage
  }

export const MessageActions = {
    ...messageThunks,
    actions: MessageSlice.actions
}