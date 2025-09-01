package ua.todolist.server.app.backend.service.assistant.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ua.todolist.server.app.backend.database.entity.ChatMessageEntity;
import ua.todolist.server.app.backend.database.repository.ChatMessageRepository;
import ua.todolist.server.app.backend.service.assistant.ChatMemoryService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatMemoryServiceImpl implements ChatMemoryService {

    private final ChatMessageRepository chatMessageRepository;

    @Value("${chat.memory.limit:25}")
    private int messageLimit;

    @Override
    public void addMessage(String message) {
        ChatMessageEntity chatMessage = ChatMessageEntity.builder()
                .role(message.startsWith("User:") ? "user" : "assistant")
                .content(message)
                .createdAt(LocalDateTime.now())
                .build();
        chatMessageRepository.save(chatMessage);
    }

    @Override
    public List<String> getLastMessages() {
        List<ChatMessageEntity> messages = new ArrayList<>(chatMessageRepository
                .findAll()
                .stream()
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                .limit(messageLimit)
                .toList());

        Collections.reverse(messages);
        return messages.stream().map(ChatMessageEntity::getContent).toList();
    }
}
