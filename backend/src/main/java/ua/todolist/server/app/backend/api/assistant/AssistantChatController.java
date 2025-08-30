package ua.todolist.server.app.backend.api.assistant;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.todolist.server.app.backend.service.assistant.AssistantService;

@RestController
@RequestMapping("/assistant")
@RequiredArgsConstructor
public class AssistantChatController {
    private final AssistantService assistantService;

    @PostMapping("/ask")
    public ResponseEntity<String> chat(@RequestParam String message) {
        String response = assistantService.generateResponse(message);
        return ResponseEntity.ok(response);
    }
}
