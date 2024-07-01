package com.chatfusion.chatfusion.controllers;


import com.chatfusion.chatfusion.domain.Chat;
import com.chatfusion.chatfusion.domain.User;
import com.chatfusion.chatfusion.exception.ChatException;
import com.chatfusion.chatfusion.exception.UserException;
import com.chatfusion.chatfusion.model.requestpayload.GroupChatRequest;
import com.chatfusion.chatfusion.model.responsepayload.ApiResponse;
import com.chatfusion.chatfusion.services.ChatService;
import com.chatfusion.chatfusion.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private UserService userService;

    @PostMapping("/createnongrpchat")
    public ResponseEntity<Chat> createNongrpchat(@Param("toUserId") String toUserId, @RequestHeader("Authorization") String token) throws UserException {
        User reqUser = this.userService.findUserByJWT(token);
        Chat chat = this.chatService.createChat(reqUser,Integer.valueOf(toUserId));
        return new ResponseEntity<Chat>(chat, HttpStatus.OK);
    }

    @PostMapping("/creategroupchat")
    public ResponseEntity<Chat> creategroupchat(@RequestHeader("Authorization") String token, @RequestBody GroupChatRequest groupChatRequest) throws UserException {
        User reqUser = this.userService.findUserByJWT(token);
        Chat groupChat = this.chatService.createGroup(groupChatRequest,reqUser);
        return new ResponseEntity<Chat>(groupChat,HttpStatus.OK);
    }

    @GetMapping("/{chatId}")
    public ResponseEntity<Chat> getChat(@PathVariable("chatId") Integer chatId) throws UserException, ChatException {
        Chat chat = this.chatService.findChatById(chatId);
        return new ResponseEntity<Chat>(chat, HttpStatus.OK);
    }

    @GetMapping("/userchats")
    public ResponseEntity<List<Chat>> getUserChats(@RequestHeader("Authorization") String token) throws UserException {
        User reqUser = this.userService.findUserByJWT(token);

        List<Chat> chats = this.chatService.findAllChatByUserId(reqUser.getId());

        return new ResponseEntity<List<Chat>>(chats, HttpStatus.OK);
    }

    @PutMapping("/{chatId}/add/{userId}")
    public ResponseEntity<Chat> addUserToGroupHandler(@PathVariable Integer chatId,
                                                      @PathVariable Integer userId, @RequestHeader("Authorization") String token)
            throws UserException, ChatException {

        User reqUser = this.userService.findUserByJWT(token);

        Chat chat = this.chatService.addUserToGroup(userId, chatId, reqUser);

        return new ResponseEntity<>(chat, HttpStatus.OK);
    }

    @PutMapping("/{chatId}/remove/{userId}")
    public ResponseEntity<Chat> removeUserFromGroupHandler(@PathVariable Integer chatId,
                                                           @PathVariable Integer userId, @RequestHeader("Authorization") String token)
            throws UserException, ChatException {

        User reqUser = this.userService.findUserByJWT(token);

        Chat chat = this.chatService.removeFromGroup(userId, chatId, reqUser);

        return new ResponseEntity<>(chat, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{chatId}")
    public ResponseEntity<ApiResponse> deleteChatHandler(@PathVariable Integer chatId,
                                                         @RequestHeader("Authorization") String token)
            throws UserException, ChatException {

        User reqUser = this.userService.findUserByJWT(token);

        this.chatService.deleteChat(chatId, reqUser.getId());

        ApiResponse res = new ApiResponse("Deleted Successfully...", false);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }





}
