package com.chatfusion.chatfusion.services;

import com.chatfusion.chatfusion.domain.Chat;
import com.chatfusion.chatfusion.domain.User;
import com.chatfusion.chatfusion.exception.ChatException;
import com.chatfusion.chatfusion.exception.UserException;
import com.chatfusion.chatfusion.model.requestpayload.GroupChatRequest;

import java.util.List;

public interface IChatService {

    public Chat createChat(User reqUser, Integer userId) throws UserException;

    public Chat findChatById(Integer chatId) throws ChatException;

    public List<Chat> findAllChatByUserId(Integer userId) throws UserException;

    public List<Chat> findChatByName(String chatName) throws ChatException;

    public Chat createGroup(GroupChatRequest req, User reqUser) throws UserException;

    public Chat addUserToGroup(Integer userId, Integer chatId, User reqUser) throws UserException, ChatException;

    public Chat renameGroup(Integer chatId, String groupName, User reqUser) throws ChatException, UserException;

    public Chat removeFromGroup(Integer chatId, Integer userId, User reqUser) throws UserException, ChatException;

    public void deleteChat(Integer chatId, Integer userId) throws ChatException, UserException;

}
