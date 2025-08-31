# === Stage 1: Build the application ===
FROM gradle:7.4.2-jdk17-alpine as builder

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо файли Gradle (спочатку копіюємо ці файли для кращого кешування)
COPY backend/gradle ./gradle
COPY backend/gradlew .
COPY backend/build.gradle .
COPY backend/settings.gradle .

# Надаємо права на виконання для gradlew
RUN chmod +x gradlew

# Копіюємо вихідний код
COPY backend/src ./src

# Збираємо додаток
RUN ./gradlew build -x test --no-daemon

# === Stage 2: Run the application ===
FROM openjdk:17-alpine

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо зібраний JAR файл з етапу збірки
COPY --from=builder /app/build/libs/*.jar app.jar

# Відкриваємо порт, на якому працює додаток
EXPOSE 8080

# Команда для запуску додатка
ENTRYPOINT ["java", "-jar", "app.jar"]