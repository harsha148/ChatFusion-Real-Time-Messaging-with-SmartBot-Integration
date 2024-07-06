import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import {MessageType} from '../../../types';
import { Box, Container, Paper } from '@mui/material';
import { secondary } from '../../../theme';
import { useAppSelector } from '../../../redux/hooks';
import { useTheme } from '@mui/material/styles';
import { formatDistanceToNow } from 'date-fns';
interface MessageProps {
  message: MessageType;
  isCurrentUser: boolean;
}

const Message: React.FC<MessageType> = (message) => {

    const currentUser = useAppSelector(state=>state.user.currentUser)
    const isCurrentUser = (message.user.id == currentUser?.id)
    const lm = isCurrentUser?'auto':'2px'
    const formattedTimestamp = formatDistanceToNow(message.timestamp)
    const theme = useTheme()
    return (
        <Box sx={{padding:'2px', maxWidth:'50%', width:'fit-content'}} className = {` ${
            isCurrentUser ? 'ml-auto' : ''
            }`}>
            <Typography variant='caption'>
                {message.user.username}
            </Typography>
            <Paper sx={{bgcolor: isCurrentUser?theme.palette.grey[500]:'primary.dark' ,padding:'10px', borderRadius:'2',paddingRight:'30px'}}>
                <Typography>
                    {message.content}
                </Typography>
            </Paper>
            <Typography variant='caption' className='ml-auto'>
                {formattedTimestamp + ' ago'}
            </Typography>
        </Box>
    );
};

export default Message;
