# === Stage 1: Build the application ===
FROM gradle:8.8.0-jdk21-alpine as builder

# Встановлюємо робочу директорію
WORKDIR /app

# Надаємо права на виконання для gradlew
RUN chmod +x gradlew

# Копіюємо вихідний код
COPY backend/src ./src

# Збираємо додаток
RUN ./gradlew build -x test --no-daemon

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