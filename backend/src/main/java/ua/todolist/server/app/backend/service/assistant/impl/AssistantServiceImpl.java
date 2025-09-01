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

    @Value("${openai.api.temperature:0.7}")
    private double temperature;

    @Value("${chat.memory.limit:50}")
    private int chatMemoryLimit;

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
        List<EmployeeEntity> employees = employeeRepository.findAll();
        List<String> previousMessages = chatMemoryService.getLastMessages();

        String prompt = promptService.createUniversalPrompt(employees, userQuestion, previousMessages);
        OpenAiRequest request = buildOpenAiRequest(prompt);

        OpenAiResponse response = callOpenAi(request);

        if (response != null) {
            chatMemoryService.addMessage("User: " + userQuestion);
            chatMemoryService.addMessage("Assistant: " + extractContent(response));
            return extractContent(response);
        }

        return "No response from AI";
    }

    private OpenAiRequest buildOpenAiRequest(String prompt) {
        OpenAiRequest request = new OpenAiRequest();
        request.setModel(model);
        request.setTemperature(temperature);

        OpenAiRequest.Message userMessage = new OpenAiRequest.Message();
        userMessage.setRole("user");
        userMessage.setContent(prompt);

        request.setMessages(List.of(userMessage));
        return request;
    }

    private OpenAiResponse callOpenAi(OpenAiRequest request) {
        try {
            return webClient.post()
                    .uri("/chat/completions")
                    .bodyValue(request)
                    .retrieve()
                    .bodyToMono(OpenAiResponse.class)
                    .retryWhen(Retry.backoff(3, Duration.ofSeconds(2))
                            .filter(throwable -> throwable instanceof WebClientResponseException.TooManyRequests))
                    .block();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private String extractContent(OpenAiResponse response) {
        return response.getChoices().getFirst().getMessage().getContent();
    }
}
