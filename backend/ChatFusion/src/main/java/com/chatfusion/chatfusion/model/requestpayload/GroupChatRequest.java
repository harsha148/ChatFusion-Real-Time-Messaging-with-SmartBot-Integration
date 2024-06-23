package com.chatfusion.chatfusion.model.requestpayload;

import java.util.List;

public class GroupChatRequest {

    private List<Integer> userIds;
    private String chatName;
    private String chatImage;

    @Override
    public String toString() {
        return "GroupChatRequest{" +
                "userIds=" + userIds +
                ", chatName='" + chatName + '\'' +
                ", chatImage='" + chatImage + '\'' +
                '}';
    }

    public GroupChatRequest(List<Integer> userIds, String chatName, String chatImage) {
        this.userIds = userIds;
        this.chatName = chatName;
        this.chatImage = chatImage;
    }

    public List<Integer> getUserIds() {
        return userIds;
    }

    public void setUserIds(List<Integer> userIds) {
        this.userIds = userIds;
    }

    public String getChatName() {
        return chatName;
    }

    public void setChatName(String chatName) {
        this.chatName = chatName;
    }

    public String getChatImage() {
        return chatImage;
    }

    public void setChatImage(String chatImage) {
        this.chatImage = chatImage;
    }
}
