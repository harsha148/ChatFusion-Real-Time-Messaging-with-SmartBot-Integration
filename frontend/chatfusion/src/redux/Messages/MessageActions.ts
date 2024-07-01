import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_API_URL } from "../../constants";
import axios, { AxiosError } from "axios";
import { Chat, MessageType, SendMessagePayload } from "../../types";

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