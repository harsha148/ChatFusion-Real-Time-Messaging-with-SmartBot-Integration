import { Divider, ListItem, Stack, useTheme } from '@mui/material';
import React from 'react'
import ChatList from '../../components/chat/ChatList';
import ChatView from '../../components/chat/ChatView';

interface Props {
    
}
 
interface State {
    
}

const ChatHomePage: React.FC<Props> = ()=>{
    const theme = useTheme()
    return ( 
        <Stack className='h-full w-full' direction='row' sx={{display:'flex'}}>
            <ListItem className='h-full' sx={{width:'20%',padding:0}}><ChatList/><Divider orientation="vertical" flexItem sx={{bgcolor:theme.palette.grey[500]}}/></ListItem>
            <ListItem className='h-full' sx={{padding:0,width:'80%'}}><ChatView id='1'/></ListItem>
        </Stack>
    );
}
 
 
export default ChatHomePage; 