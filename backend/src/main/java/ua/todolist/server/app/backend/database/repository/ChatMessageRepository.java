package ua.todolist.server.app.backend.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.todolist.server.app.backend.database.entity.ChatMessageEntity;

public interface ChatMessageRepository extends JpaRepository<ChatMessageEntity, Long> {

}