package com.chatfusion.chatfusion.domain;


import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    private Set<User> admins = new HashSet<>();
    @ManyToOne
    private User createdBy;
    @ManyToMany
    private Set<User> users = new HashSet<User>();

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

    public Chat(int id, boolean isGroup, String groupName, Set<User> admins, User createdBy, Set<User> users, List<Message> messages) {
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

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(ArrayList<Message> messages) {
        this.messages = messages;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> members) {
        this.users = members;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public Set<User> getAdmins() {
        return admins;
    }

    public void setAdmins(Set<User> admins) {
        this.admins = admins;
    }

    public boolean isGroup() {
        return isGroup;
    }

    public void setGroup(boolean group) {
        isGroup = group;
    }

    @OneToMany
    private List<Message> messages=new ArrayList<>();;

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }
}
