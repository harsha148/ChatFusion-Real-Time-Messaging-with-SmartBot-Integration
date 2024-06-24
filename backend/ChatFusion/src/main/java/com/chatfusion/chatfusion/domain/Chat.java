package com.chatfusion.chatfusion.domain;


import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.HashSet;

@Entity
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private boolean isGroup;
    private String groupname;

    public String getGroupname() {
        return groupname;
    }

    public void setGroupname(String groupName) {
        this.groupname = groupName;
    }

    @ManyToMany
    private HashSet<User> admins = new HashSet<User>();
    @ManyToOne
    private User createdBy;
    @ManyToMany
    private HashSet<User> users = new HashSet<User>();

    @Override
    public String toString() {
        return "Chat{" +
                "id=" + id +
                ", isGroup=" + isGroup +
                ", groupName='" + groupname + '\'' +
                ", admins=" + admins +
                ", createdBy=" + createdBy +
                ", users=" + users +
                ", messages=" + messages +
                '}';
    }

    public Chat(int id, boolean isGroup, String groupName, HashSet<User> admins, User createdBy, HashSet<User> users, ArrayList<Message> messages) {
        this.id = id;
        this.isGroup = isGroup;
        this.groupname = groupName;
        this.admins = admins;
        this.createdBy = createdBy;
        this.users = users;
        this.messages = messages;
    }

    public Chat() {

    }

    public ArrayList<Message> getMessages() {
        return messages;
    }

    public void setMessages(ArrayList<Message> messages) {
        this.messages = messages;
    }

    public HashSet<User> getUsers() {
        return users;
    }

    public void setUsers(HashSet<User> members) {
        this.users = members;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public HashSet<User> getAdmins() {
        return admins;
    }

    public void setAdmins(HashSet<User> admins) {
        this.admins = admins;
    }

    public boolean isGroup() {
        return isGroup;
    }

    public void setGroup(boolean group) {
        isGroup = group;
    }

    @OneToMany
    private ArrayList<Message> messages;

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }
}
