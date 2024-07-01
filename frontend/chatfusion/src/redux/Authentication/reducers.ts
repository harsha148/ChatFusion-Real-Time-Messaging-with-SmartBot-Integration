import { createSlice } from "@reduxjs/toolkit";
import { login, signup } from "./Actions";

interface AuthenticationState{
    loading:boolean,
    isAuthenticated: boolean
}

var auth:boolean = false
if(localStorage.getItem('token')!=null){
    auth=true
}

const initialState:AuthenticationState = {
    loading:false,
    isAuthenticated:auth
}

const loginSlice = createSlice({
    name:'authentication',
    initialState,
    reducers:{
        logout:(state)=>{
            state.isAuthenticated = false
            localStorage.clear()
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(login.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(login.rejected,(state,action)=>{
            state.loading = false
            state.isAuthenticated = false
            console.log('Login request rejected',action.payload)
        })
        builder.addCase(login.fulfilled,(state,action)=>{
            state.loading=false
            state.isAuthenticated = action.payload.authenticated
            if(action.payload.authenticated){
                localStorage.setItem("token",action.payload.token)
            }
            console.log('Login request successfull with response',action.payload)
        })
        builder.addCase(signup.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(signup.rejected,(state,action)=>{
            state.loading = false
            state.isAuthenticated = false
            console.log('Signup request rejected',action.payload)
        })
        builder.addCase(signup.fulfilled,(state,action)=>{
            state.loading=false
            state.isAuthenticated = action.payload.authenticated
            if(action.payload.authenticated){
                localStorage.setItem("token",action.payload.token)

            }
            console.log('Signup request successfull with response',action.payload)
        })
    }
})

export const loginReducer = loginSlice.reducer

const loginThunks = {
    login,
    signup
  }

export const loginActions = {
    ...loginThunks,
    actions: loginSlice.actions
}