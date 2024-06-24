package com.chatfusion.chatfusion.controllers;


import com.chatfusion.chatfusion.domain.Message;
import com.chatfusion.chatfusion.domain.User;
import com.chatfusion.chatfusion.exception.ChatException;
import com.chatfusion.chatfusion.exception.MessageException;
import com.chatfusion.chatfusion.exception.UserException;
import com.chatfusion.chatfusion.model.requestpayload.SendMessageRequest;
import com.chatfusion.chatfusion.model.responsepayload.ApiResponse;
import com.chatfusion.chatfusion.services.IMessageService;
import com.chatfusion.chatfusion.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    public IMessageService messageService;

    @Autowired
    public IUserService userService;

    @PostMapping
    public ResponseEntity<Message> sendMessage(@RequestBody SendMessageRequest sendMessageRequest, @RequestHeader("Authorization") String token) throws UserException, ChatException {
        User sender = this.userService.findUserByJWT(token);
        sendMessageRequest.setUserId(sender.getId());
        Message message = this.messageService.sendMessage(sendMessageRequest);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    @GetMapping("/{chatId}")
    public ResponseEntity<List<Message>> getChatMessageHandler(@PathVariable Integer chatId,
                                                               @RequestHeader("Authorization") String token) throws UserException, ChatException {

        User user = this.userService.findUserByJWT(token);

        List<Message> messages = this.messageService.getChatsMessages(chatId, user);

        return new ResponseEntity<List<Message>>(messages, HttpStatus.OK);
    }

    @DeleteMapping("/{messageId}")
    public ResponseEntity<ApiResponse> deleteMessageHandler(@PathVariable Integer messageId,
                                                            @RequestHeader("Authorization") String token) throws UserException, ChatException, MessageException, MessageException {

        User user = this.userService.findUserByJWT(token);

        this.messageService.deleteMessage(messageId, user);

        ApiResponse res = new ApiResponse("Deleted successfully......", false);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

}
