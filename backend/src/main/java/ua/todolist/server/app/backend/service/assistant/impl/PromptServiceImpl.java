package ua.todolist.server.app.backend.service.assistant.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.todolist.server.app.backend.database.entity.EmployeeEntity;
import ua.todolist.server.app.backend.service.assistant.ChatMemoryService;
import ua.todolist.server.app.backend.service.assistant.PromptService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PromptServiceImpl implements PromptService {
    private final ChatMemoryService memoryService;

    public String createUniversalPrompt(List<EmployeeEntity> employees, String userQuestion, List<String> previousMessages) {
        StringBuilder prompt = new StringBuilder();

        prompt.append("You are a versatile AI assistant. You have access to the full database of employees and their DISC profiles. ")
                .append("Whenever the user's question is related to analyzing employees, their behavior, DISC traits, or team dynamics, ")
                .append("respond as a DISC assessment expert, providing professional and actionable analysis. ")
                .append("If the question is unrelated to employee data, respond simply and clearly, like a regular AI assistant.\n\n");

        prompt.append("EMPLOYEE DATABASE:\n====================\n");
        employees.forEach(employee -> {
            prompt.append("\n--- ").append(employee.getName()).append(" ---\n")
                    .append("Position: ").append(employee.getPosition()).append("\n")
                    .append("Company: ").append(employee.getCompany()).append("\n")
                    .append("Behavior Type: ").append(employee.getBehaviorTypeClass()).append("\n")
                    .append("DISC Traits: D: ").append(employee.getControllerAssertive())
                    .append(", I: ").append(employee.getExpressiveSocial())
                    .append(", S: ").append(employee.getSupporterEmpathy())
                    .append(", C: ").append(employee.getAnalyzerLogical()).append("\n")
                    .append("Key Traits: Assertive: ").append(employee.getAssertive())
                    .append(", Sociable: ").append(employee.getWarmAndSociable())
                    .append(", Patient: ").append(employee.getPatience())
                    .append(", Attention to Detail: ").append(employee.getAttentionToDetail()).append("\n");
        });

        if (previousMessages != null && !previousMessages.isEmpty()) {
            prompt.append("\nPREVIOUS CONVERSATION CONTEXT:\n==============================\n");
            previousMessages.forEach(msg -> prompt.append(msg).append("\n"));
        }

        prompt.append("\nUSER QUESTION:\n=================\n").append(userQuestion).append("\n\n");

        prompt.append("INSTRUCTIONS TO AI:\n")
                .append("1. If the question is about analyzing employees, DISC profiles, or team dynamics, respond as an expert.\n")
                .append("2. If the question is unrelated to employee data, respond simply and clearly.\n")
                .append("3. Always be professional, approachable, and informative.\n");

        return prompt.toString();
    }
}
