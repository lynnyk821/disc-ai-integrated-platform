package ua.todolist.server.app.backend.service.assistant.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import ua.todolist.server.app.backend.service.assistant.ChatMemoryService;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatMemoryServiceImpl implements ChatMemoryService {
    private final RedisTemplate<String, String> redisTemplate;
    private final static String REDIS_CHAT_KEY = "assistant:chat";

    @Override
    public void addMessage(String message) {
        ListOperations<String, String> listOps = redisTemplate.opsForList();
        listOps.rightPush(REDIS_CHAT_KEY, message);

        // Тримати лише останні 50 повідомлень
        listOps.trim(REDIS_CHAT_KEY, -50, -1);
    }

    @Override
    public List<String> getLastMessages(int n) {
        ListOperations<String, String> listOps = redisTemplate.opsForList();
        Long size = listOps.size(REDIS_CHAT_KEY);
        if (size == null || size == 0) return Collections.emptyList();
        return listOps.range(REDIS_CHAT_KEY, Math.max(0, size - n), size - 1);
    }
}
