package com.chatfusion.chatfusion.controllers;


import com.chatfusion.chatfusion.exception.UserException;
import com.chatfusion.chatfusion.model.requestpayload.LoginRequest;
import com.chatfusion.chatfusion.config.TokenProvider;
import com.chatfusion.chatfusion.domain.User;
import com.chatfusion.chatfusion.model.responsepayload.AuthenticationResponse;
import com.chatfusion.chatfusion.repository.UserRepository;
import com.chatfusion.chatfusion.model.responsepayload.ApiResponse;
import com.chatfusion.chatfusion.services.IUserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/authentication")
public class AuthenticationController {

    @Autowired
    private TokenProvider  tokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private IUserService userService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<AuthenticationResponse> signup(@ModelAttribute User user) throws UserException {

        String username = user.getUsername();
        String password = user.getPassword();
        String profile = user.getProfile();
        String email = user.getEmail();

        User existingUser = userService.findUserByEmail(email);
        if (existingUser != null) {
            return new ResponseEntity<AuthenticationResponse>(new AuthenticationResponse("User already exists",false), HttpStatus.ACCEPTED);
        }

        User newUser = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setProfile(profile);
        user.setEmail(email);
        userRepository.save(user);
        Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = this.tokenProvider.generateToken(authentication);

        AuthenticationResponse response = new AuthenticationResponse(jwt, true);

        return new ResponseEntity<AuthenticationResponse>(response, HttpStatus.OK);

    }

    @PostMapping("/signin")
    public ResponseEntity<AuthenticationResponse> signin(@Valid @ModelAttribute LoginRequest loginRequest) throws UserException {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        Authentication authentication = this.authenticate(email, password);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = this.tokenProvider.generateToken(authentication);

        AuthenticationResponse response = new AuthenticationResponse(jwt, true);

        return new ResponseEntity<AuthenticationResponse>(response, HttpStatus.OK);
    }

    public Authentication authenticate(String email, String password) throws UserException {
        org.springframework.security.core.userdetails.User userDetails = userService.getUserDetails(email);
        if (userDetails == null) {
            throw new UserException("User not found");
        }
        if(!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid credentials");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
