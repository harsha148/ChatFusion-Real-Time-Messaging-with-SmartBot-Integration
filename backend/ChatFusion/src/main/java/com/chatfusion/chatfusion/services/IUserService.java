package com.chatfusion.chatfusion.services;

import com.chatfusion.chatfusion.exception.UserException;
import com.chatfusion.chatfusion.model.requestpayload.UpdateUserRequest;
import com.chatfusion.chatfusion.domain.User;

import java.util.List;

public interface IUserService {

    public User findUserById(int id) throws UserException;

    public User findUserByEmail(String email) throws UserException;

    public List<User> searchUser(String query) throws UserException;

    public User findUserByJWT(String jwt) throws UserException;

    public User updateUser(Integer userId, UpdateUserRequest request) throws UserException;

    public org.springframework.security.core.userdetails.User getUserDetails(String email) throws UserException;

}
