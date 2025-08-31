# === Stage 1: Build the application ===
FROM gradle:8.8.0-jdk21-alpine as builder

# Встановлюємо робочу директорію
WORKDIR /app

# Спочатку копіюємо ВСІ файли бекенду
COPY backend/ .

# Надаємо права на виконання для gradlew (якщо він існує)
RUN if [ -f "gradlew" ]; then chmod +x gradlew; fi

# Збираємо додаток (спочатку пробуємо gradlew, потім gradle)
RUN if [ -f "gradlew" ]; then ./gradlew build -x test --no-daemon; else gradle build -x test --no-daemon; fi

# === Stage 2: Run the application ===
FROM eclipse-temurin:21-jre-alpine

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо зібраний JAR файл з етапу збірки
COPY --from=builder /app/build/libs/*.jar app.jar

# Відкриваємо порт, на якому працює додаток
EXPOSE 8080

# Команда для запуску додатка
ENTRYPOINT ["java", "-jar", "app.jar"]