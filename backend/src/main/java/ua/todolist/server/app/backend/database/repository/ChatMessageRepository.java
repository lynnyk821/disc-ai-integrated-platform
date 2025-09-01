package ua.todolist.server.app.backend.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.todolist.server.app.backend.database.entity.ChatMessageEntity;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessageEntity, Long> {
    List<ChatMessageEntity> findTopNByOrderByCreatedAtDesc(int n);
}