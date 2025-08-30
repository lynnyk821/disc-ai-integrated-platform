package ua.todolist.server.app.backend.service.assistant;

import ua.todolist.server.app.backend.database.entity.EmployeeEntity;

import java.util.List;

public interface PromptService {
    String createUniversalPrompt(List<EmployeeEntity> employees, String userQuestion, List<String> previousMessages);
}
