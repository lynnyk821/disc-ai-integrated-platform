# === Stage 1: Build the application ===
FROM gradle:7.4.2-jdk17-alpine as builder
WORKDIR /app
COPY . .

# Встановіть робочу директорію та запустіть build
WORKDIR /app/backend
RUN gradle build -x test --no-daemon

# === Stage 2: Run the application ===
FROM openjdk:17-alpine
WORKDIR /app

# Копіюємо збірку
COPY --from=builder /app/backend/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]