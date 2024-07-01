import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types';
import { BASE_API_URL } from '../../constants';
import axios, { AxiosError } from 'axios';



export const searchUser = createAsyncThunk(
  'users/searchUser',
  async(query:string, thunkApi)=>{
    console.log('Invoking API with URL: '+BASE_API_URL+'/api/users/'+query)
    try{
      const response = await axios({
        method:'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        url:BASE_API_URL+'/api/users/'+query
      });
      console.log('Response from the api:')
      console.log(response.data)
      return thunkApi.fulfillWithValue(response.data)
    }
    catch(err){
      console.log('Error occurred while invoking search user endpoint'+err)
      const error = err as AxiosError
      thunkApi.rejectWithValue(error.response?.status)
    }
  }
)

export const userProfile = createAsyncThunk(
  'users/userProfile',
  async(token:string,thunkApi)=>{
    console.log('Invoking API with URL: '+BASE_API_URL+'/api/users/profile')
    try{
      const response = await axios({
        method:'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        url:BASE_API_URL+'/api/users/profile'
      });
      console.log('Received response from user profile api')
      console.log(response.data)
      return thunkApi.fulfillWithValue(response.data)
    }
    catch(err){
      console.log('Error occurred while invoking user profile endpoint'+err)
      const error = err as AxiosError
      thunkApi.rejectWithValue(error.response?.status)
    }
  }
)


export const allUsers = createAsyncThunk(
  'users/allUsers',
  async(token:string,thunkApi)=>{
    console.log('Invoking API with URL: '+BASE_API_URL+'/api/users/allusers')
    try{
      const response = await axios({
        method:'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        url:BASE_API_URL+'/api/users/allusers'
      });
      console.log('Received response from all users api')
      console.log(response.data)
      return thunkApi.fulfillWithValue(response.data)
    }
    catch(err){
      console.log('Error occurred while invoking all users endpoint'+err)
      const error = err as AxiosError
      thunkApi.rejectWithValue(error.response?.status)
    }
  }
)