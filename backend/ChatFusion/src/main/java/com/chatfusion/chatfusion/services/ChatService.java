package com.chatfusion.chatfusion.services;

import com.chatfusion.chatfusion.domain.Chat;
import com.chatfusion.chatfusion.domain.User;
import com.chatfusion.chatfusion.exception.ChatException;
import com.chatfusion.chatfusion.exception.UserException;
import com.chatfusion.chatfusion.model.requestpayload.GroupChatRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService implements IChatService {
    @Override
    public Chat createChat(User reqUser, Integer userId) throws UserException {
        return null;
    }

    @Override
    public Chat findChatById(Integer chatId) throws ChatException {
        return null;
    }

    @Override
    public List<Chat> findAllChatByUserId(Integer userId) throws UserException {
        return List.of();
    }

    @Override
    public List<Chat> findChatByName(String chatName) throws ChatException {
        return List.of();
    }

    @Override
    public Chat createGroup(GroupChatRequest req, User reqUser) throws UserException {
        return null;
    }

    @Override
    public Chat addUserToGroup(Integer userId, Integer chatId, User reqUser) throws UserException, ChatException {
        return null;
    }

    @Override
    public Chat renameGroup(Integer chatId, String groupName, User reqUser) throws ChatException, UserException {
        return null;
    }

    @Override
    public Chat removeFromGroup(Integer chatId, Integer userId, User reqUser) throws UserException, ChatException {
        return null;
    }

    @Override
    public void deleteChat(Integer chatId, Integer userId) throws ChatException, UserException {

    }
}
