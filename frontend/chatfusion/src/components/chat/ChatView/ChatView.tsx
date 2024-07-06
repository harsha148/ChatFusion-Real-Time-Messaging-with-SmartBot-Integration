import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { TextField, Button, Container, List, Typography, Divider, FormControl, InputLabel, OutlinedInput, IconButton, InputAdornment, Stack, Input, styled, ListItem} from '@mui/material';
import {Chat, MessageType, SendMessagePayload, WebsocketMessage} from '../../../types'
import * as Yup from 'yup';
import Message from '../Message';
import { useAppSelector } from '../../../redux/hooks';
import { Box, Paper } from '@mui/material';
import { makeStyles, RootRef } from '@material-ui/core';
import { useTheme } from '@mui/material/styles';
import { AccountBoxRounded, AccountCircle, Call, CallOutlined, DuoOutlined, Search, Send, VideoCall, VideoCallOutlined, Visibility } from '@mui/icons-material';
import { RootState } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { chatActions } from '../../../redux/Chat/ChatReducers';
import WebSocketService from '../../../websocket-client/WebSocketService';
import { BASE_API_URL } from '../../../constants';

interface MatchParams {
  id: string;
}

const parseWebsocketMessage = (wsMessage:WebsocketMessage)=>{
  console.log('Parsing websocket message')
  console.log(wsMessage)
  const message:MessageType={
    id: wsMessage.id,
    content: wsMessage.content,
    user: {
      id: wsMessage.userId,
      username: '',
      email: '',
      profile: ''
    },
    timestamp: wsMessage.timestamp,
    chat:{
      id: wsMessage.userId,
      isGroup:false,
      groupname: '',
      messages: [],
      createdBy:undefined,
      admins:[],
      users:[]
    }
  }
  return message
}

const MessageSchema = Yup.object().shape({
  text: Yup.string().required('Required'),
});

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  messageList: {
    flexGrow: 1,
    overflow: 'hidden',
    marginBottom: theme.spacing(2),
  },
  form: {
    display: 'flex',
    marginTop:'auto'
  },
  textField: {
    flexGrow: 1,
  },
  sendButton: {
    marginLeft: theme.spacing(2),
  },
}));
const webSocketService = new WebSocketService(BASE_API_URL + '/ws')
const ChatView: React.FC<MatchParams> = ({id}) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const chatId = useAppSelector(store=>store.chats.selectedChatId);
  useEffect(()=>{
    if(chatId){
      dispatch(chatActions.getChatMessages(chatId))
    }
  },[chatId])

  const endMessageRef = useRef<HTMLDivElement>(null)
  const currentUser = useAppSelector(state=>state.user.currentUser)
  const chats = useAppSelector((state: RootState) =>state.chats.userChats)
  var chat = useAppSelector(store=>store.chats.currentActiveChat)
  const currentChatMessages = useAppSelector(store=>store.chats.currentChatMessages)
  const [message,setMessage] = useState<string>('')
  const theme = useTheme()
  useEffect(()=>{
    endMessageRef.current?.scrollIntoView()
  },[currentChatMessages])

  useEffect(()=>{
    webSocketService.connect()
    return ()=>{
      console.log('Disconnecting client from the websocket')
      webSocketService.disconnect()
    }
  },[])

  useEffect(() => {
    if (chat?.id) {
      console.log(`Setting up subscription for chat ID: ${chat.id}`);
      webSocketService.subscribe(`/group/${chat.id}`, (wsMessageJson) => {
        const wsMessage:WebsocketMessage = JSON.parse(wsMessageJson.body)
        console.log('Received message in ChatView:', wsMessage);
        const message = parseWebsocketMessage(wsMessage)
        console.log('Parsed message from the web socket is:')
        console.log(message)
        dispatch(chatActions.actions.ON_MESSAGE_RECEIVE(message));
      });
    }
    return ()=>{
      if(chat?.id){
        console.log(`Unsubscribing from the chat id:${chat?.id}`)
        webSocketService.unsubscribe(`/group/${chat.id}`)
      }
    }
  }, [chat?.id, webSocketService]);


  const handleSendMessage = (e:any)=>{
    e.preventDefault()
    if(message.length>0){
      console.log('Sending Message',message)
      const sendMessageReq:SendMessagePayload={
        userId:currentUser?.id,
        chatId:chatId,
        content:message
      }
      const wsResponse = webSocketService.sendMessage(sendMessageReq)
      // dispatch(chatActions.sendMessage(sendMessageReq))
      setMessage('')
    }
  }

  useEffect(()=>{
    console.log('Current Chat updated')
    console.log(chat)
  },[chat])
  

  const styles = {
    paperContainer: {
        backgroundImage: `url(${"/../img/background.png"})`
    },
    circleImg: {
      borderRadius:'50%'
    },
    sendMessage:{
      // position: 'fixed',
      bottom: 0,
      width: '100%',
      height: 60,
      // textAlign: 'center',
      alignContent:'bottom'
    }
  };
  if(!chat||!currentUser){
    return (
      <Container maxWidth={false} className="flex-col h-full overflow-hidden w-full" disableGutters sx={{margin:0, width:'100%'}}>
        <Paper className='h-full' sx={{padding:0}} style={styles.paperContainer}>
          <Stack className='w-full h-full' direction='column' alignItems='center' justifyContent='center'>
            <img style={styles.circleImg} src='https://store-images.s-microsoft.com/image/apps.58144.13921645428983582.68aba529-9be2-4278-9a48-793b90e6b4e7.8d236fd2-34bb-4785-808f-6fc9f4850410?h=464' width='200' height='200'></img>
            <Typography variant='h5'>
              Welcome to ChatFusion
            </Typography>
          </Stack>
          
        </Paper>
      </Container>
    )
  }
  console.log('Current chat from Chat view')
  console.log(chat)
  return (
    <Container maxWidth={false} className="flex-col h-full w-full" disableGutters sx={{margin:0, width:'100%'}}>
      <Paper className='h-full' sx={{padding:0}} style={styles.paperContainer}>
        <Paper sx={{ bgcolor: theme.palette.grey[800], height: '6%', padding: 0, display:'flex', borderRadius:0}}>
          <Stack className='w-full' direction='row' alignItems='center' justifyContent='space-between'>
            <Stack direction="row" alignItems="center" gap={1} sx={{paddingLeft:'5px'}}>
              <AccountCircle fontSize='large'/>
              <Typography align='center' variant="body1" sx={{my:'auto'}}>
                {chat.isGroup?chat.groupname:(chat.users[0].username==currentUser?.username?chat.users[1].username:chat.users[0].username)}
              </Typography>
            </Stack>
            <Stack direction='row' spacing={1} sx={{paddingRight:'2%'}}>
              <IconButton><DuoOutlined/></IconButton>
              <IconButton><CallOutlined/></IconButton>
              <IconButton><Search/></IconButton>
            </Stack>
          </Stack>
        </Paper>
        <Paper className='h-full'>
          <List sx={{overflow:'scroll', overflowX:'hidden', height:'80%',paddingLeft:'15%',paddingRight:'15%'}}>
            {currentChatMessages.map((message: MessageType) => (
              <ListItem>
                <Message
                  id = {message.id}
                  user = {message.user}
                  content = {message.content}
                  timestamp={message.timestamp}
                  chat={undefined}
                />
              </ListItem>
            ))}
            <ListItem><div ref={endMessageRef}></div></ListItem>
          </List>
        </Paper>
        <form style={{height:'60px',position:'fixed',bottom:0,width:'-webkit-fill-available'}} onSubmit={handleSendMessage}>
          <FormControl  sx={{width:'100%', height:'100%'}} variant="outlined">
            <TextField
              id="sendMessage"
              type='text'
              placeholder='Send Message...'
              value = {message}
              onChange = {(e)=>{e.preventDefault();setMessage(e.target.value)}}
              InputProps={{
                endAdornment:(
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleSendMessage}
                    edge="end"
                  >
                    <Send/>
                  </IconButton>
                </InputAdornment>),
                style: { 
                  borderRadius: "0px",
                }
              }}
              sx={{marginTop:'auto'}}
            />
          </FormControl>
        </form>
      </Paper>
    </Container>
  );
};

export default ChatView;
