import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { RootState } from '../../../types';
import { Box, Container, Divider, List, ListItem, ListItemText, Paper, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ChatList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const chats = useSelector((state: RootState) => state.chats);

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const theme = useTheme()
  return (
    <Container className="flex-col h-full overflow-hidden" disableGutters>
      <Paper className='h-full'>
        <Paper sx={{ bgcolor: theme.palette.grey[600], height: '6%', padding: 0, display:'flex', borderRadius:0}}>
            <Typography align='center' variant="h5" sx={{padding:'10px', my:'auto'}}>
                Chats
            </Typography>
        </Paper>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Search chats"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            style: {
              borderRadius: "0px",
            }
          }}
        />
        <List className="flex-grow overflow-auto">
          {filteredChats.map((chat) => (
            <div key={chat.id}>
              <ListItem button component={Link} to={`/chat/${chat.id}`}>
                <ListItemText
                  primary={chat.name}
                  secondary={
                    chat.messages.length > 0
                      ? chat.messages[chat.messages.length - 1].text
                      : 'No messages yet'
                  }
                />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default ChatList;
