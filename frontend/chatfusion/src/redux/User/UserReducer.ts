import { User } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { allUsers, searchUser, userProfile } from './UserActions';
import { RootState } from '../store';


interface UsersState{
  loading:boolean,
  searchUsersResult:User[],
  currentUser?:User
  allUsers:User[]
}

const initialState:UsersState = {
  loading:false,
  searchUsersResult:[],
  currentUser:{
    username:'',
    email:'',
    id:0,
    profile:''
  },
  allUsers: []
}

const userSlice = createSlice({
  name:'users',
  initialState,
  reducers:{

  },
  extraReducers:(builder)=>{
    builder.addCase(searchUser.pending,(state)=>{
      state.loading = true
    })
    builder.addCase(searchUser.rejected,(state,action)=>{
      state.loading = false
      state.searchUsersResult = []
      console.log('Error occurred while searching for chats'+action.payload)
    })
    builder.addCase(searchUser.fulfilled,(state,action)=>{
      state.loading=false
      state.searchUsersResult = action.payload.users
    })
    builder.addCase(userProfile.pending,(state)=>{
      state.loading = true
    })
    builder.addCase(userProfile.rejected,(state,action)=>{
      state.loading = false
      console.log('Error occurred while fetching user profile'+action.payload)
    })
    builder.addCase(userProfile.fulfilled,(state,action)=>{
      state.loading=false
      state.currentUser = action.payload
    })
    builder.addCase(allUsers.pending,(state)=>{
      state.loading = true
    })
    builder.addCase(allUsers.rejected,(state,action)=>{
      state.loading = false
      console.log('Error occurred while fetching user profile'+action.payload)
    })
    builder.addCase(allUsers.fulfilled,(state,action)=>{
      state.loading=false
      state.allUsers = action.payload
    })
  }
})

export const userReducer = userSlice.reducer
const userThunks = {
  searchUser,
  userProfile,
  allUsers
}

export const AllUserSelector = (state: RootState) => state.user.allUsers;

export const userActions = {
  ...userThunks,
  actions: userSlice.actions
}



