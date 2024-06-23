package com.chatfusion.chatfusion.model.requestpayload;

public class UpdateUserRequest {

    private String username;

    private String profile;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getProfile() {
        return profile;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public UpdateUserRequest(String username, String profile) {
        this.username = username;
        this.profile = profile;
    }

    @Override
    public String toString() {
        return "UpdateUserRequest{" +
                "username='" + username + '\'' +
                ", profile='" + profile + '\'' +
                '}';
    }
}
