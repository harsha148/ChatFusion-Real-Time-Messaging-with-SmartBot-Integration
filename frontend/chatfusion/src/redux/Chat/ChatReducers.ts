import { PayloadAction, ThunkDispatch, createSlice, current } from '@reduxjs/toolkit';
import { Chat, MessageType } from '../../types';
import { createUserChat, getChatMessages, userChats } from './ChatActions';
import { RootState } from '../store';
import { useDispatch } from 'react-redux';
import { userActions } from '../User/UserReducer';

interface ChatState{
    userChats:Chat[],
    loading:boolean,
    selectedChatId?:number,
    currentActiveChat?:Chat,
    loadChats:boolean
    currentChatMessages:MessageType[]
}


const initialState:ChatState = {
    loadChats:false,
    selectedChatId:undefined,
    userChats:[],
    loading:false,
    currentActiveChat:undefined,
    currentChatMessages:[]
}


const chatSlice = createSlice({
    name:'chats',
    initialState,
    reducers:{
        SET_CURRENT_CHAT:(state,action)=>{
            state.selectedChatId=action.payload
            state.currentActiveChat=state.userChats.find((chat) => chat.id === action.payload)
        }
    },
    extraReducers:(builder)=> {
        builder.addCase(userChats.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(userChats.rejected,(state,action)=>{
            state.loading = false
            state.userChats = []
            console.log('Error occurred while fetching current user chats',action.payload)
        })
        builder.addCase(userChats.fulfilled,(state,action)=>{
            state.loading=false
            state.userChats = action.payload
            console.log('Successfully fetched current user chats',action.payload)
        })
        builder.addCase(getChatMessages.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(getChatMessages.rejected,(state,action)=>{
            state.loading = false
            state.currentChatMessages = []
            console.log('Error occurred while fetching current user chats',action.payload)
        })
        builder.addCase(getChatMessages.fulfilled,(state,action)=>{
            state.loading=false
            if(action.payload){
                state.currentChatMessages = action.payload
            }
            console.log('Successfully fetched current user chats',action.payload)
        })
        builder.addCase(createUserChat.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(createUserChat.rejected,(state,action)=>{
            state.loading = false
            state.currentActiveChat = undefined
            console.log('Error occurred while fetching current user chats',action.payload)
        })
        builder.addCase(createUserChat.fulfilled,(state,action)=>{
            state.loading=false
            state.loadChats = !state.loadChats
            state.currentActiveChat = action.payload
            state.selectedChatId = action.payload?.id
            const currentUserChats = state.userChats
            if(action.payload){
                currentUserChats.push(action.payload)
            }
            state.userChats = currentUserChats
            console.log('Successfully fetched current user chats',action.payload)
        })
    },
})

export const chatReducer=chatSlice.reducer;

const chatThunks = {
    userChats,
    createUserChat,
    getChatMessages
}



export const chatActions = {
    ...chatThunks,
    actions: chatSlice.actions
}
