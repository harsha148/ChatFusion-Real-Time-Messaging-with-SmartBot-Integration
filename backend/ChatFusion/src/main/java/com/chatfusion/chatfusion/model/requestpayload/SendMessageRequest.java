package com.chatfusion.chatfusion.model.requestpayload;

public class SendMessageRequest {

    private Integer userId;
    private Integer chatId;
    private String content;

    public SendMessageRequest(String userId, String chatId, String content) {
        this.userId = Integer.parseInt(userId);
        this.chatId = Integer.parseInt(chatId);
        this.content = content;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getChatId() {
        return chatId;
    }

    public void setChatId(Integer chatId) {
        this.chatId = chatId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
