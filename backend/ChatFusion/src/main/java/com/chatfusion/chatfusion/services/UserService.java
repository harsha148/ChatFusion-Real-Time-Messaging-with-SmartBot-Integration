package com.chatfusion.chatfusion.services;

import com.chatfusion.chatfusion.exception.UserException;
import com.chatfusion.chatfusion.model.requestpayload.UpdateUserRequest;
import com.chatfusion.chatfusion.config.TokenProvider;
import com.chatfusion.chatfusion.domain.User;
import com.chatfusion.chatfusion.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService implements IUserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenProvider tokenProvider;

    @Override
    public User findUserById(int id) throws UserException {
        return userRepository.findById(id).orElseThrow(() -> new UserException("User not found"));
    }

    @Override
    public List<User> getAllUsers() throws UserException {
        return userRepository.findAll();
    }

    @Override
    public User findUserByEmail(String email) throws UserException {
        if(email == null || email.isEmpty()){
            throw new UserException("Email is null or empty");
        }
        return userRepository.findByEmail(email);
    }

    @Override
    public List<User> searchUser(String query) throws UserException {
        return userRepository.searchUser(query);
    }

    @Override
    public User findUserByJWT(String jwt) throws UserException{
        String email = tokenProvider.getEmailFromToken(jwt);
        System.out.println("Email extracted from the token is: "+email);
        if (email == null || email.isEmpty()){
            throw new BadCredentialsException("Authentication failed! Invalid token.");
        }
        User user =  userRepository.findByEmail(email);
        if (user == null){
            throw new UserException("User not found");
        }
        return user;
    }

    @Override
    public User updateUser(Integer userId, UpdateUserRequest request) throws UserException {
        User user = findUserById(userId);
        if(request.getUsername()!= null && !request.getUsername().isEmpty()){
            user.setUsername(request.getUsername());
        }
        if(request.getProfile()!= null && !request.getProfile().isEmpty()){
            user.setProfile(request.getProfile());
        }
        return user;
    }

    public org.springframework.security.core.userdetails.User getUserDetails(String email) throws UserException {
        if(email == null || email.isEmpty()){
            throw new UserException("Email is null or empty");
        }

        User user = userRepository.findByEmail(email);
        if (user == null){
            throw new UserException("User not found");
        }
        List<GrantedAuthority> authorities = new ArrayList<>();

        return new org.springframework.security.core.userdetails.User(user.getEmail(),user.getPassword(),authorities);

    }
}
