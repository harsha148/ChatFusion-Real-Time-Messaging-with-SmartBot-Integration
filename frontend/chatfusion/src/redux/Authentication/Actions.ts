import axios, { AxiosError } from "axios";
import { SignInPayload, SignInResponse, SignUpDetails } from "../../types";
import { LOGIN } from "./ActionTypes";
import { BASE_API_URL } from "../../constants";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface SignInActionResponse {
    type: typeof LOGIN;
    payload: SignInResponse;
}

export const login = createAsyncThunk(
    'authentication/login',
    async(signInRequest: SignInPayload,thunkApi)=>{
        console.log('Invoking API with URL: '+BASE_API_URL+'/authentication/signin with request payload:')
        console.log(signInRequest)
        const data = new FormData()
        data.append('email',signInRequest.email)
        data.append('password',signInRequest.password)
        console.log('Form data:'+data)
        try
        {
            const response = await axios({
            method:'POST',
            url:BASE_API_URL+'/authentication/signin',
            headers:{
                content:'application/json'
            },
            data:data
            });
            console.log(response)
            return thunkApi.fulfillWithValue(response.data)
            // .get(`${BASE_API_URL}/authentication/signin`)
        }
        catch(err){
            console.log('Error occurred while calling the sigin endpoint: ', err)
            const error = err as AxiosError
            thunkApi.rejectWithValue(error.response?.status)
        }
    }
)

export const signup = createAsyncThunk(
    'authentication/signup',
    async(signUpRequest: SignUpDetails,thunkApi)=>{
        console.log('Invoking API with URL: '+BASE_API_URL+'/authentication/signup with request payload:')
        console.log(signUpRequest)
        const data = new FormData()
        data.append('email',signUpRequest.email)
        data.append('password',signUpRequest.password)
        data.append('username',signUpRequest.username)
        data.append('profile',signUpRequest.profile)
        console.log('Form data:'+data)
        try
        {
            const response = await axios({
            method:'POST',
            url:BASE_API_URL+'/authentication/signup',
            headers:{
                content:'application/json'
            },
            data:data
            });
            console.log(response)
            return thunkApi.fulfillWithValue(response.data)
        }
        catch(err){
            console.log('Error occurred while calling the sigin endpoint: ', err)
            const error = err as AxiosError
            thunkApi.rejectWithValue(error.response?.status)
        }
    }
)

  