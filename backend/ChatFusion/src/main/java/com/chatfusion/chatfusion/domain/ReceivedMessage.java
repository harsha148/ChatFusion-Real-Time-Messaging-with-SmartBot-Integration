package com.chatfusion.chatfusion.domain;

import java.time.LocalDateTime;

public class ReceivedMessage {

    private int id;
    private String content;
    private LocalDateTime timestamp;
    private int chatId;
    private int userId;

    @Override
    public String toString() {
        return "ReceivedMessage{" +
                "id=" + id +
                ", content='" + content + '\'' +
                ", timestamp=" + timestamp +
                ", chatId=" + chatId +
                ", userId=" + userId +
                '}';
    }

    public ReceivedMessage(int id, String content, LocalDateTime timestamp, int chatId, int userId) {
        this.id = id;
        this.content = content;
        this.timestamp = timestamp;
        this.chatId = chatId;
        this.userId = userId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public int getChatId() {
        return chatId;
    }

    public void setChatId(int chatId) {
        this.chatId = chatId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
