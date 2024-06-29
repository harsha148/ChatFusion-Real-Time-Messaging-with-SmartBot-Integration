import React, { ChangeEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Container, List, Typography, Divider, FormControl, InputLabel, OutlinedInput, IconButton, InputAdornment, Stack, Input, styled} from '@mui/material';
import {MessageType} from '../../../types'
import * as Yup from 'yup';
import { RootState } from '../../../types';
import Message from '../Message';
import { addMessage } from '../../../redux/Chat/ChatActions';
import { useAppDispatch } from '../../../redux/hooks';
import { Box, Paper } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import { useTheme } from '@mui/material/styles';
import { AccountBoxRounded, AccountCircle, Send, Visibility } from '@mui/icons-material';

interface MatchParams {
  id: string;
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
    overflow: 'auto',
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

const ChatView: React.FC<MatchParams> = ({id}) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const chatId = parseInt(id, 10);
  const chat = useSelector((state: RootState) =>
    state.chats.find((chat) => chat.id === chatId)
  );
  const [message,setMessage] = useState<string>('')
  const theme = useTheme()
  if (!chat) {
    return <div>Chat not found</div>;
  }
  const handleSendMessage = ()=>{
    console.log('Sending Message',message)
    setMessage('')
  }

  const onMessageChange = (e:ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
    e.preventDefault()
    setMessage(e.target.value)
  }

  const styles = {
    paperContainer: {
        backgroundImage: `url(${"/../img/background.png"})`
    },
  };

  const MyMessageBox = styled('div')({
    position: 'fixed',
    bottom: 0,
    width: '100%',
    height: 60,
    textAlign: 'center',
    alignContent:'bottom'
  });
  
  
  return (
    <Container maxWidth={false} className="flex-col h-full overflow-hidden w-full" disableGutters sx={{margin:0, width:'100%'}}>
      <Paper className='h-full' sx={{padding:0}} style={styles.paperContainer}>
        <Paper sx={{ bgcolor: theme.palette.grey[800], height: '6%', padding: 0, display:'flex', borderRadius:0}}>
          <Stack direction="row" alignItems="center" gap={1} sx={{paddingLeft:'5px'}}>
            <AccountCircle fontSize='large'/>
            <Typography align='center' variant="body1" sx={{my:'auto'}}>
              {chat.name}
            </Typography>
          </Stack>
        </Paper>
        {/* <Paper style={{overflow: 'auto'}}> */}
          <List className={classes.messageList} sx={{padding:'10px'}}>
            {chat.messages.map((message: MessageType) => (
              <Message
                id = {message.id}
                sender = {message.sender}
                text = {message.text}
                timestamp={message.timestamp}
              />
            ))}
          </List>
        {/* </Paper> */}
        {/* <Divider sx={{marginTop:'auto'}}/> */}
        <MyMessageBox>
          <FormControl  sx={{width:'100%', height:'100%'}} variant="outlined">
            <TextField
              id="sendMessage"
              type='text'
              placeholder='Send Message...'
              value = {message}
              onChange = {onMessageChange}
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
        </MyMessageBox>
      </Paper>
    </Container>
  );
};

export default ChatView;
