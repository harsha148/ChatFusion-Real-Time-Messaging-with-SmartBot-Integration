import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import {MessageType} from '../../../types';
import { Box, Container, Paper } from '@mui/material';
import { secondary } from '../../../theme';
import { useAppSelector } from '../../../redux/hooks';
import { useTheme } from '@mui/material/styles';
interface MessageProps {
  message: MessageType;
  isCurrentUser: boolean;
}

const Message: React.FC<MessageType> = (message) => {

    const currentUser = useAppSelector(store=>store.user.user)
    console.log('Fetched the current user name:', currentUser?.username)
    const isCurrentUser = (message.sender == currentUser?.username)
    console.log('Comparing it with current message sender: ',message.sender)
    console.log('isCurrentUser:',isCurrentUser)
    const lm = isCurrentUser?'auto':'2px'
    const theme = useTheme()
    return (
        <Box sx={{padding:'2px', maxWidth:'50%', width:'fit-content'}} className = {` ${
            isCurrentUser ? 'ml-auto' : ''
            }`}>
            <Typography variant='caption'>
                {message.sender}
            </Typography>
            <Paper sx={{bgcolor: isCurrentUser?theme.palette.grey[500]:'primary.dark' ,padding:'10px', borderRadius:'2',paddingRight:'30px'}}>
                <Typography>
                    {message.text}
                </Typography>
            </Paper>
            <Typography variant='caption' className='ml-auto'>
                {message.timestamp}
            </Typography>
        </Box>
    );
};

export default Message;
