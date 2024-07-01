import { ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AllUserSelector, userActions } from "../../../redux/User/UserReducer";
import { Button, Checkbox, FormControlLabel, FormGroup, IconButton, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, TextField, Typography } from "@mui/material";
import { useAppSelector } from "../../../redux/hooks";
import { AccountCircleOutlined, ArrowBackIosNew, GroupAdd, Search } from "@mui/icons-material";
import { User } from "../../../types";

interface IProps{
    handleClose:()=>void
}


const NewGroup: React.FC<IProps> = ({handleClose}) => {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>(); 
    useEffect(()=>{
        dispatch(userActions.allUsers(''))
      },[])
    const allUsers = useAppSelector(AllUserSelector)
    const [searchQuery,setSearchQuery] = useState('')
    const [groupname, setGroupName] = useState('')
    const [selectedUserIds, setSelectedUsers] = useState<string[]>([])
    var filteredUsers:User[] = [];
    if(allUsers?.length>0){
        filteredUsers = allUsers.filter((user) =>
            user.username.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    const handleCreateChat = (event: any)=>{
        handleClose()
        console.log('User clicked:')
        console.log(event)
    }

    const handleSelectedUsersChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean)=>{
        const array = selectedUserIds
        if (checked){
            array.push(event.target.value)
            setSelectedUsers(array)
        }
        else{
            const index = array.indexOf(event.target.value, 0);
            if (index > -1) {
                array.splice(index, 1);
            }
            setSelectedUsers(array)
        }
    }

    const createGroup= ()=>{
        if(groupname.length==0){
            console.log('Please enter group name to create a group')
            return
        }
        if(selectedUserIds.length==0){
            console.log('Please select atleast one user to create the group with')
            return 
        }
        console.log('Created group with name as: '+groupname)
        console.log('Selected users')
        console.log(selectedUserIds)
        handleClose()
    }

    return (
    <Stack direction="column" justifyContent='space-between'>
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
            <TextField
                variant="outlined"
                fullWidth
                placeholder="Group Name"
                value={groupname}
                onChange={(e) => {
                    setGroupName(e.target.value)
                }}
                InputProps={{
                    style: {
                    borderRadius: "10px",
                    }
                }}
                sx={{padding:'10px'}}/>
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
            <FormGroup>
                <List className="flex-grow overflow-auto">
                    {filteredUsers.map((user) => (
                        <div key={user.id}>
                            <ListItem>
                                {/* <ListItemButton
                                    onClick={handleCreateChat}
                                >
                                    <ListItemIcon>
                                        <AccountCircleOutlined />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={user.username}
                                        secondary={
                                        user.profile.length > 0
                                            ? user.profile
                                            : ''
                                        }
                                    />
                                </ListItemButton> */}
                                <FormControlLabel control={<Checkbox value={user.id} onChange={handleSelectedUsersChange}/>} label={user.username} />
                            </ListItem>
                        </div>
                    ))}
                </List>
            </FormGroup>
        </Stack>
        <Button onClick={createGroup} variant='outlined' color='error' endIcon={<GroupAdd/>} sx={{borderRadius:'10px',margin:'10px',justifyContent:'space-between'}}>
            Create Group
        </Button>
    </Stack>)
}

export default NewGroup