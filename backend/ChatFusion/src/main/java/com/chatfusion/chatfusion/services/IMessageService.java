package com.chatfusion.chatfusion.services;

import com.chatfusion.chatfusion.domain.Message;
import com.chatfusion.chatfusion.domain.User;
import com.chatfusion.chatfusion.exception.ChatException;
import com.chatfusion.chatfusion.exception.MessageException;
import com.chatfusion.chatfusion.exception.UserException;
import com.chatfusion.chatfusion.model.requestpayload.SendMessageRequest;

import java.util.List;

public interface IMessageService {

    public Message sendMessage(SendMessageRequest req) throws UserException, ChatException;

    public List<Message> getChatsMessages(Integer chatId, User reqUser) throws ChatException, UserException;

    public Message findMessageById(Integer messaageId) throws MessageException;

    public void deleteMessage(Integer messageId, User reqUser) throws MessageException;

}
