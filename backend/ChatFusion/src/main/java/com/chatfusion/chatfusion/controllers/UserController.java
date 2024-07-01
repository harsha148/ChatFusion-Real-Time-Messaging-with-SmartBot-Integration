package com.chatfusion.chatfusion.controllers;


import com.chatfusion.chatfusion.exception.UserException;
import com.chatfusion.chatfusion.domain.User;
import com.chatfusion.chatfusion.model.requestpayload.UpdateUserRequest;
import com.chatfusion.chatfusion.model.responsepayload.ApiResponse;
import com.chatfusion.chatfusion.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private IUserService userService;

    @GetMapping("/allusers")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = List.of();

        try{
            users = this.userService.getAllUsers();
        }
        catch (UserException e) {
            return new ResponseEntity<List<User>>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }

    @GetMapping("/{query}")
    public ResponseEntity<List<User>> searchUserHandler(@PathVariable("query") String query){
        List<User> users = List.of();
        try {
             users= this.userService.searchUser(query);
        }
        catch (UserException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getUserByToken(@RequestHeader("Authorization") String token) throws UserException {
        return new ResponseEntity<User>(userService.findUserByJWT(token),HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<ApiResponse> updateUserHandler(@RequestBody UpdateUserRequest request,
                                                         @RequestHeader("Authorization") String token) throws UserException {

        User user = this.userService.findUserByJWT(token);
        this.userService.updateUser(user.getId(), request);

        ApiResponse response = new ApiResponse();
        response.setMessage("User updated Successfully");
        response.setSuccess(true);

        return new ResponseEntity<ApiResponse>(response, HttpStatus.ACCEPTED);
    }

}
