package com.chatfusion.chatfusion.services;

import com.chatfusion.chatfusion.domain.Chat;
import com.chatfusion.chatfusion.domain.Message;
import com.chatfusion.chatfusion.domain.User;
import com.chatfusion.chatfusion.exception.ChatException;
import com.chatfusion.chatfusion.exception.UserException;
import com.chatfusion.chatfusion.model.requestpayload.GroupChatRequest;
import com.chatfusion.chatfusion.repository.ChatRepository;
import com.chatfusion.chatfusion.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChatService implements IChatService {

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private MessageRepository messageRepository;

    @Override
    public Chat createChat(User reqUser, Integer userId) throws UserException {
        User user = this.userService.findUserById(userId);

        Chat existingChat = this.chatRepository.findNonGroupChat(reqUser, user);

        if (existingChat != null) {
            return existingChat;
        }
        Chat newChat = new Chat();
        newChat.setCreatedBy(reqUser);
        newChat.getUsers().add(user);
        newChat.getUsers().add(reqUser);
        this.chatRepository.save(newChat);
        return newChat;
    }

    @Override
    public Chat findChatById(Integer chatId) throws ChatException {
        return this.chatRepository.findById(chatId).orElseThrow(()->new ChatException("Chat not found"));
    }

    @Override
    public List<Chat> findAllChatByUserId(Integer userId) throws UserException {
        return this.chatRepository.findChatByUserId(userId);
    }

    @Override
    public List<Chat> findChatByName(String chatName) throws ChatException {
        return this.chatRepository.findChatByName(chatName);
    }

    @Override
    public Chat createGroup(GroupChatRequest req, User reqUser) throws UserException {
        Chat newGroupChat = new Chat();
        newGroupChat.setCreatedBy(reqUser);
        newGroupChat.getUsers().add(reqUser);
        newGroupChat.setGroup(true);
        newGroupChat.getAdmins().add(reqUser);
        newGroupChat.setGroupname(req.getChatName());
        for(Integer userId: req.getUserIds()){
            User user = this.userService.findUserById(userId);
            newGroupChat.getUsers().add(user);
        }
        this.chatRepository.save(newGroupChat);
        return newGroupChat;
    }

    @Override
    public Chat addUserToGroup(Integer userId, Integer chatId, User reqUser) throws UserException, ChatException {
        Chat chat = this.findChatById(chatId);
        User user = this.userService.findUserById(userId);
        if (!chat.getAdmins().contains(reqUser)){
            throw new UserException("You do not have permission to add user to this chat");
        }
        chat.getUsers().add(user);
        this.chatRepository.save(chat);
        return chat;
    }

    @Override
    public Chat renameGroup(Integer chatId, String groupName, User reqUser) throws ChatException, UserException {
        Chat chat = this.findChatById(chatId);
        if (!chat.getAdmins().contains(reqUser)){
            throw new UserException("You do not have permission to add user to this chat");
        }
        chat.setGroupname(groupName);
        this.chatRepository.save(chat);
        return chat;
    }

    @Override
    public Chat removeFromGroup(Integer chatId, Integer userId, User reqUser) throws UserException, ChatException {
        Chat chat = this.findChatById(chatId);
        User user = this.userService.findUserById(userId);
        if (!chat.getAdmins().contains(reqUser)){
            throw new UserException("You do not have permission to add user to this chat");
        }
        if (chat.getUsers().contains(user)){
            chat.getUsers().remove(user);
            this.chatRepository.save(chat);
        }
        return chat;
    }

    @Override
    public void deleteChat(Integer chatId, Integer userId) throws ChatException, UserException {
        Chat chat = this.chatRepository.findById(chatId)
                .orElseThrow(() -> new ChatException("The expected chat is not found while deleteing"));
        this.chatRepository.delete(chat);
    }
}
