import { createAsyncThunk } from '@reduxjs/toolkit';
import { Chat, MessageType, SendMessagePayload } from '../../types';
import { BASE_API_URL } from '../../constants';
import { url } from 'inspector';
import axios, { AxiosError } from 'axios';

export const userChats = createAsyncThunk(
  'chats/userchats',
  async(token: string,thunkApi)=>{
      console.log('Invoking API with URL: '+BASE_API_URL+'/chat/userchats')
      try
      {
          const response = await axios({
            method:'GET',
            url:BASE_API_URL+'/chat/userchats',
            headers:{
                content:'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          console.log('Response from the chats/userchats endpoint is:')
          console.log(response.data)
          return thunkApi.fulfillWithValue(response.data)
      }
      catch(err){
          console.log('Error occurred while calling the sigin endpoint: ', err)
          const error = err as AxiosError 
          thunkApi.rejectWithValue(error.response?.status)
      }
  }
)

export const createUserChat = createAsyncThunk(
  'chats/createUserChat',
  async(userId: number,thunkApi)=>{
      console.log('Invoking API with URL: '+BASE_API_URL+'/chat/createnongrpchat')
      try
      {
          const data = new FormData()
          data.append('toUserId',String(userId))
          const response = await axios({
            method:'POST',
            url:BASE_API_URL+'/chat/createnongrpchat',
            headers:{
                content:'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            data:data
          });
          console.log(response)
          return thunkApi.fulfillWithValue<Chat>(response.data)
          // .get(`${BASE_API_URL}/authentication/signin`)
      }
      catch(err){
          console.log('Error occurred while calling the sigin endpoint: ', err)
          const error = err as AxiosError
          thunkApi.rejectWithValue(error.response?.status)
      }
  }
)

export const getChatMessages = createAsyncThunk(
  'chats/getChatMessages',
  async(chatId:number,thunkApi)=>{
      console.log('Invoking API with URL: '+BASE_API_URL+'/api/messages/'+chatId)
      try
      {
          const response = await axios({
            method:'GET',
            url:BASE_API_URL+'/api/messages/'+chatId,
            headers:{
                content:'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          console.log('Response from get chat messages endpoint')
          console.log(response.data)
          return thunkApi.fulfillWithValue<MessageType[]>(response.data)
          // .get(`${BASE_API_URL}/authentication/signin`)
      }
      catch(err){
          console.log('Error occurred while calling the get chat endpoint: ', err)
          const error = err as AxiosError
          thunkApi.rejectWithValue(error.response?.status)
      }
  }
)


export const sendMessage = createAsyncThunk(
    'messages/sendMessage',
    async(messageReq: SendMessagePayload,thunkApi)=>{
        console.log('Invoking API with URL: '+BASE_API_URL+'/api/messages/sendMessage')
        console.log('Sending message with request as')
        
        try
        {
            const data = new FormData()
            data.append('userId',String(messageReq.userId))
            data.append('content',messageReq.content)
            data.append('chatId',String(messageReq.chatId))
            console.log(data)
            const response = await axios({
              method:'POST',
              url:BASE_API_URL+'/api/messages/sendMessage',
              headers:{
                  content:'application/json',
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
              data:data
            });
            console.log('Response from the send message api')
            console.log(response.data)
            return thunkApi.fulfillWithValue<MessageType>(response.data)
            // .get(`${BASE_API_URL}/authentication/signin`)
        }
        catch(err){
            console.log('Error occurred while calling the send Message endpoint: ', err)
            const error = err as AxiosError
            thunkApi.rejectWithValue(error.response?.status)
        }
    }
  )
