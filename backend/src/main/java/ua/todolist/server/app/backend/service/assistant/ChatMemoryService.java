package ua.todolist.server.app.backend.service.assistant;

import java.util.List;

public interface ChatMemoryService {
    void addMessage(String message);
    List<String> getLastMessages(int n);
}
