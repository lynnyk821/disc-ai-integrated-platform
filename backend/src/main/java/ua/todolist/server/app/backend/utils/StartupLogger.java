package ua.todolist.server.app.backend.utils;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class StartupLogger {
    @Value("${REDIS_HOST:redis}")
    private String redisHost;

    @Value("${REDIS_PORT:6379}")
    private String redisPort;

    @Value("${DATABASE_PASSWORD:}")
    private String databasePassword;

    @Value("${OPENAI_API_KEY:}")
    private String openaiKey;

    @PostConstruct
    public void logVariables() {
        log.info("=== Application Variables ===");
        log.info("Redis Host: {}", redisHost);
        log.info("Redis Port: {}", redisPort);
        log.info("Database Password: {}", databasePassword.isEmpty() ? "NOT SET" : databasePassword);
        log.info("OpenAI API Key: {}", openaiKey.isEmpty() ? "NOT SET" : openaiKey);
    }
}
