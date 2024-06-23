package com.chatfusion.chatfusion.services;

import com.chatfusion.chatfusion.domain.Chat;
import com.chatfusion.chatfusion.domain.Message;
import com.chatfusion.chatfusion.domain.User;
import com.chatfusion.chatfusion.exception.ChatException;
import com.chatfusion.chatfusion.exception.MessageException;
import com.chatfusion.chatfusion.exception.UserException;
import com.chatfusion.chatfusion.model.requestpayload.SendMessageRequest;
import com.chatfusion.chatfusion.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageService implements IMessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ChatService chatService;

    @Override
    public Message sendMessage(SendMessageRequest req) throws UserException, ChatException {
        User user = this.userService.findUserById(req.getUserId());
        Chat chat = this.chatService.findChatById(req.getChatId());

        Message message = new Message();
        message.setChat(chat);
        message.setUser(user);
        message.setContent(req.getContent());
        message.setTimestamp(LocalDateTime.now());

        message = this.messageRepository.save(message);
        return message;
    }

    @Override
    public List<Message> getChatsMessages(Integer chatId, User reqUser) throws ChatException, UserException {
        return List.of();
    }

    @Override
    public Message findMessageById(Integer messaageId) throws MessageException {
        return null;
    }

    @Override
    public void deleteMessage(Integer messageId, User reqUser) throws MessageException {

    }
}
