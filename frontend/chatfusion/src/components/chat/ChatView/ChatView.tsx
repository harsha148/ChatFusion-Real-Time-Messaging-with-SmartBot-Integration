import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Container, List, Typography, Divider} from '@mui/material';
import {MessageType} from '../../../types'
import * as Yup from 'yup';
import { RootState } from '../../../types';
import Message from '../Message';
import { addMessage } from '../../../redux/Chat/ChatActions';
import { useAppDispatch } from '../../../redux/hooks';
import { Box, Paper } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import { useTheme } from '@mui/material/styles';

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
  const theme = useTheme()
  if (!chat) {
    return <div>Chat not found</div>;
  }
  
  return (
    <Container className="flex-col h-full overflow-hidden" disableGutters sx={{margin:0}}>
      <Paper className='h-full' sx={{padding:0}}>
        <Paper sx={{ bgcolor: theme.palette.grey[600], height: '6%', padding: 0, display:'flex', borderRadius:0}}>
          <Typography align='center' variant="h5" sx={{padding:'10px', my:'auto'}}>
            {chat.name}
          </Typography>
        </Paper>
        
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
        <Divider/>
        <Box className='mt-auto w-full'>
          <TextField
            name="text"
            label="Type a message"
            variant="outlined"
            size="small"
            InputProps={{
              style: {
                borderRadius: 0,
              }
            }}
          />

          <Button type="submit" variant="contained" color="primary" className={classes.sendButton}>
            Send
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ChatView;
