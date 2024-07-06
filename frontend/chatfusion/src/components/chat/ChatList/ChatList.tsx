import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../redux/store';
import { Container, CssBaseline, Dialog, DialogContent, DialogTitle, Fab, IconButton, InputAdornment, List, ListItem, ListItemButton, ListItemText, Paper, PaperProps, Stack, TextField, Typography, useTheme } from '@mui/material';
import { CarCrashTwoTone, PlaylistAdd, Search } from '@mui/icons-material';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useAppSelector } from '../../../redux/hooks';
import { userActions } from '../../../redux/User/UserReducer';
import { Chat, User } from '../../../types';
import NewChat from '../NewChat';
import Draggable from 'react-draggable';
import { chatActions } from '../../../redux/Chat/ChatReducers';
import NewGroup from '../NewGroup';
import ChatHomePage from '../../../pages/ChatHomePage';

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const ChatList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  useEffect(()=>{
    dispatch(chatActions.userChats(''))
  },[])
  const chats:Chat[] = useAppSelector((state: RootState) => state.chats.userChats);
  const handleSearch = (searchQuery:string)=>{
    console.log('Dispatching search user action with search query:'+searchQuery)
    if(searchQuery!=''){
      dispatch(userActions.searchUser(searchQuery))
    }
  }
  var [filteredChats,setFilteredChats] = useState<Chat[]>([])

  useEffect(()=>{
    console.log('User chats/search term updated in ChatList component')
    console.log(chats)
    if(searchTerm=='' && chats){
      setFilteredChats(chats)
    }
    else if(chats){
      setFilteredChats(chats.filter((chat)=>{
        (chat.isGroup && chat.groupname.includes(searchTerm)) || (!chat.isGroup && (chat.users[0].username.includes(searchTerm)||(chat.users[1].username.includes(searchTerm))))
      }))
    }
    console.log('Filtered userChats from store into ChatLIST')
    console.log(filteredChats)
  },[searchTerm,chats])
  
  const [newChatOpen, setNewChatOpen] = useState(false)
  const [newGroupOpen, setNewGroupOpen] = useState(false)
  const handleNewChatClose = ()=>{
    setNewChatOpen(false)
  }
  const handleNewGroupClose = () =>{
    setNewGroupOpen(false)
  }
  const handleNewGroupOpen = () =>{
    setNewChatOpen(false)
    setNewGroupOpen(true)
  }

  const handleChatClick = (chatId:number)=>{
    dispatch(chatActions.actions.SET_CURRENT_CHAT(chatId))
  }
  const currentUser = useAppSelector(state=>state.user.currentUser)
  const theme = useTheme()
  console.log('Filtered Chats just before rendering')
  console.log(filteredChats)
  console.log('Type of filtered list is '+typeof(filteredChats))
  return (
    
    <Container maxWidth={false} className="h-full w-full" disableGutters >
      {newChatOpen && !newGroupOpen && (<Paper className='h-full'>
         <NewChat handleClose={handleNewChatClose} handleNewGroup={handleNewGroupOpen}/>
      </Paper>)}
      {newGroupOpen && !newChatOpen && (<Paper className='h-full'>
        <NewGroup handleClose={handleNewGroupClose}/>
      </Paper>)}
      {!newChatOpen && !newGroupOpen &&(<Paper className='h-full'>
        <Stack sx={{height:'60px'}} direction='row' justifyContent="space-between" alignItems="center">
          <Typography align='left' variant="h5" sx={{padding:'10px'}}>
              Chats
          </Typography>
          <IconButton onClick={()=>{
            setNewChatOpen(true)
          }}>
            <PlaylistAdd />
          </IconButton>
        </Stack>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Search or start a new chat"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            handleSearch(e.target.value)
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
          sx={{padding:'10px'}}
        />
        {/* <Paper style={{overflow: 'auto'}}> */}
          <List className="flex-grow overflow-auto">
            {filteredChats.length>0 && filteredChats.map((chat) => (
              <div key={chat.id}>
                <ListItem>
                  <ListItemButton id={String(chat.id)} onClick={(event)=>{handleChatClick(chat.id)}}>
                    <ListItemText
                      primary={chat.isGroup?chat.groupname:(chat.users[0].username==currentUser?.username?chat.users[1].username:chat.users[0].username)}
                      // primary = {chat.groupname}
                      secondary={
                        chat.messages.length > 0
                          ? chat.messages[chat.messages.length - 1].content
                          : 'No messages yet'
                      }
                    />
                  </ListItemButton>
                </ListItem>
                {/* <Divider /> */}
              </div>
            ))}
          </List>
      </Paper>)}
    </Container>
  );
};

export default ChatList;
