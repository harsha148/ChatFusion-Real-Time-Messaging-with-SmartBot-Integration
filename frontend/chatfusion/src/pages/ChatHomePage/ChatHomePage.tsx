import { Divider, ListItem, Stack } from '@mui/material';
import React from 'react'
import ChatList from '../../components/chat/ChatList';
import ChatView from '../../components/chat/ChatView';

interface Props {
    
}
 
interface State {
    
}
 
class ChatHomePage extends React.Component<Props, State> {
    // state = {s :  }
    render() { 
        return ( 
            <Stack className='h-full w-full' direction='row'>
                <ListItem className='h-full' sx={{width:'35%',padding:0}}><ChatList/><Divider orientation="vertical" flexItem/></ListItem>
                <ListItem className='h-full' sx={{padding:0,width:'65%'}}><ChatView id='1'/></ListItem>
            </Stack>
        );
    }
}
 
export default ChatHomePage; 