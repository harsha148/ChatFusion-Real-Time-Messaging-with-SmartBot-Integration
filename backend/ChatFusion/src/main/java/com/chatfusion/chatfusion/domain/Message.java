package com.chatfusion.chatfusion.domain;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
public class Message {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String content;
    private LocalDateTime timestamp;
    @ManyToOne
    private User user;

    public Message(Integer id, String content, LocalDateTime timestamp, User user, Chat chat) {
        this.id = id;
        this.content = content;
        this.timestamp = timestamp;
        this.user = user;
        this.chat = chat;
    }

    public Message() {

    }

    public ReceivedMessage getReceivedMessage() {
        return new ReceivedMessage(this.id,this.content,this.timestamp,this.chat.getId(),this.user.getId());
    }

    @Override
    public String toString() {
        return "Message{" +
                "id=" + id +
                ", content='" + content + '\'' +
                ", timestamp=" + timestamp +
                ", user=" + user +
                ", chat=" + (chat != null ? chat.getId() : null) +
                '}';
    }

    public Chat getChat() {
        return chat;
    }

    public void setChat(Chat chat) {
        this.chat = chat;
    }

    @ManyToOne
    @JsonBackReference
    private Chat chat;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }
}
