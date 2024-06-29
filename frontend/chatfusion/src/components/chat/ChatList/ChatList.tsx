import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { RootState } from '../../../types';
import { Container, CssBaseline, InputAdornment, List, ListItem, ListItemText, Paper, TextField, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';

const ChatList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const chats = useSelector((state: RootState) => state.chats);

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <Container maxWidth={false} className="h-full w-full" disableGutters >
      <Paper className='h-full'>
        <Typography align='left' variant="h5" sx={{height: '6%',padding:'10px', my:'auto'}}>
            Chats
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Search or start a new chat"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
                {/* <Divider /> */}
              </div>
            ))}
          </List>
        {/* </Paper> */}
      </Paper>
    </Container>
  );
};

export default ChatList;
