package ua.todolist.server.app.backend.service.assistant.impl;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.util.retry.Retry;
import ua.todolist.server.app.backend.api.assistant.dto.OpenAiRequest;
import ua.todolist.server.app.backend.api.assistant.dto.OpenAiResponse;
import ua.todolist.server.app.backend.database.entity.EmployeeEntity;
import ua.todolist.server.app.backend.database.repository.EmployeeRepository;
import ua.todolist.server.app.backend.service.assistant.AssistantService;
import ua.todolist.server.app.backend.service.assistant.ChatMemoryService;
import ua.todolist.server.app.backend.service.assistant.PromptService;

import java.time.Duration;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AssistantServiceImpl implements AssistantService {

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.api.url}")
    private String apiUrl;

    @Value("${openai.api.model}")
    private String model;

    @Value("${openai.api.temperature}")
    private double temperature;

    private WebClient webClient;

    private final PromptService promptService;
    private final ChatMemoryService chatMemoryService;
    private final EmployeeRepository employeeRepository;

    @PostConstruct
    public void init() {
        this.webClient = WebClient.builder()
                .baseUrl(apiUrl)
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    @Override
    public String generateResponse(String userQuestion) {
        List<EmployeeEntity> employees = this.employeeRepository.findAll();

        List<String> previousMessages = chatMemoryService.getLastMessages(10);
        String prompt = promptService.createUniversalPrompt(employees, userQuestion, previousMessages);

        // 3. Створюємо запит до OpenAI
        OpenAiRequest request = new OpenAiRequest();
        request.setModel(model);
        request.setTemperature(temperature);

        OpenAiRequest.Message userMessage = new OpenAiRequest.Message();
        userMessage.setRole("user");
        userMessage.setContent(prompt);

        request.setMessages(List.of(userMessage));

        // 4. Виконуємо запит
        OpenAiResponse response = webClient.post()
                .uri(apiUrl + "/chat/completions")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(OpenAiResponse.class)
                .retryWhen(Retry.backoff(3, Duration.ofSeconds(2))
                        .filter(throwable -> throwable instanceof WebClientResponseException.TooManyRequests))
                .block();

        // 5. Зберігаємо питання та відповідь через ChatMemoryService
        if (response != null) {
            chatMemoryService.addMessage("User: " + userQuestion);
            chatMemoryService.addMessage("Assistant: " + response);
        }

        assert response != null;
        return response.getChoices().getFirst().getMessage().getContent();
    }
}
