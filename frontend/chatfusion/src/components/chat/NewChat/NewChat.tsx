import { ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AllUserSelector, userActions } from "../../../redux/User/UserReducer";
import { Button, IconButton, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, TextField, Typography, useTheme } from "@mui/material";
import { useAppSelector } from "../../../redux/hooks";
import { AccountCircleOutlined, ArrowBackIosNew, GroupAdd, Search } from "@mui/icons-material";
import { User } from "../../../types";
import { chatActions } from "../../../redux/Chat/ChatReducers";

interface IProps{
    handleClose:()=>void
    handleNewGroup:()=>void
}



const NewChat: React.FC<IProps> = ({handleClose,handleNewGroup}) => {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>(); 
    useEffect(()=>{
        dispatch(userActions.allUsers(''))
      },[])
    const allUsers = useAppSelector(AllUserSelector)
    const [searchQuery,setSearchQuery] = useState('')
    var filteredUsers:User[] = [];
    if(allUsers?.length>0){
        filteredUsers = allUsers.filter((user) =>
            user.username.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    const handleCreateChat = (userId: number)=>{
        console.log('User clicked:')
        console.log(userId)
        dispatch(chatActions.createUserChat(userId))
        handleClose()
    }
    const onCreateGroup = ()=>{
        handleNewGroup()
    }
    const theme = useTheme()
    return (
    <Stack direction="column">
        <Stack sx={{height:'60px',my:'auto'}} direction='row' alignItems="center">
            <IconButton onClick={()=>{
                handleClose()
          }}>
            <ArrowBackIosNew fontSize="medium"/>
          </IconButton>
          <Typography align='left' variant="h5" sx={{padding:'10px',my:'auto'}}>
              New Chat
          </Typography>
        </Stack>
        <Button onClick={onCreateGroup} variant='outlined' color='error' endIcon={<GroupAdd/>} sx={{borderRadius:'10px',margin:'10px',justifyContent:'space-between'}}>
            Create Group
        </Button>
        <TextField
            variant="outlined"
            fullWidth
            placeholder="Search a user"
            value={searchQuery}
            onChange={(e) => {
                setSearchQuery(e.target.value)
            }}
            InputProps={{
                startAdornment:(
                <InputAdornment position="start">
                    <Search />
                </InputAdornment>),
                style: {
                borderRadius: "10px",
                }
            }}
            sx={{padding:'10px'}}/>
        <List className="flex-grow overflow-auto">
            {filteredUsers.map((user) => (
                <div key={user.id}>
                    <ListItem>
                        <ListItemButton
                            id={String(user.id)}
                            onClick={(event:any)=>{
                                handleCreateChat(user.id)
                            }}
                        >
                            <ListItemIcon>
                                <AccountCircleOutlined />
                            </ListItemIcon>
                            <ListItemText
                                primary={user.username}
                                secondary={
                                user.profile.length > 0
                                    ? user.profile
                                    : 'Too busy to add profile'
                                }
                            />
                        </ListItemButton>
                    </ListItem>
                </div>
            ))}
        </List>
    </Stack>)
}

export default NewChat