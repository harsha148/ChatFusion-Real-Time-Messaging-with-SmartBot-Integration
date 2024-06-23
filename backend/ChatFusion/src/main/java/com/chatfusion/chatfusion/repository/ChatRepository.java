package com.chatfusion.chatfusion.repository;

import com.chatfusion.chatfusion.domain.Chat;
import com.chatfusion.chatfusion.domain.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatRepository {

    @Query("select c from Chat c join c.users u where u.id =:userId")
    public List<Chat> findChatByUserId(@Param("userId") String userId);

    @Query("select c from Chat c where c.isGroup=False and :toUser member of c.users and :fromUser member of c.users")
    public Chat findNonGroupChat(@Param("toUser") User toUser, @Param("fromUser") User fromUser);

}
