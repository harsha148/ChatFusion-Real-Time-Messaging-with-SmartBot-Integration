package com.chatfusion.chatfusion.controllers;

import com.chatfusion.chatfusion.domain.Message;
import com.chatfusion.chatfusion.domain.ReceivedMessage;
import com.chatfusion.chatfusion.exception.ChatException;
import com.chatfusion.chatfusion.exception.UserException;
import com.chatfusion.chatfusion.model.requestpayload.SendMessageRequest;
import com.chatfusion.chatfusion.services.IMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class RealTimeChat {

    private SimpMessagingTemplate simpMessagingTemplate;
    private IMessageService messageService;

    public RealTimeChat(SimpMessagingTemplate simpMessagingTemplate, IMessageService messageService) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.messageService = messageService;
    }

    @MessageMapping("/message")
    @SendTo("/group/public")
    public ReceivedMessage recieveMessage(@Payload SendMessageRequest sendMessageRequest) throws ChatException, UserException {
        Message message = messageService.sendMessage(sendMessageRequest);
        ReceivedMessage receivedMessage = message.getReceivedMessage();
        simpMessagingTemplate.convertAndSend("/group/" + message.getChat().getId().toString(), receivedMessage);
        System.out.println("Sending message to clients connected to the socket:/group" + message.getChat().getId().toString()+ ",message: "+receivedMessage);
        return receivedMessage;
    }
}
