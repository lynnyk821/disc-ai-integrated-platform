# === Stage 1: Build the JAR ===
FROM gradle:8.8-jdk21 AS builder
WORKDIR /app
COPY . .
RUN gradle build -x test --no-daemon

# === Stage 2: Run the application ===
FROM openjdk:21-jdk-slim
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]