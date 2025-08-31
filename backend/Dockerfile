# === Stage 1: Build the application ===
FROM gradle:7.4.2-jdk17-alpine as builder
WORKDIR /app

# Спочатку копіюємо лише файли конфігурації Gradle
COPY backend/build.gradle .
COPY backend/settings.gradle .
COPY backend/gradle.properties .
COPY backend/gradle/wrapper/gradle-wrapper.jar ./gradle/wrapper/
COPY backend/gradle/wrapper/gradle-wrapper.properties ./gradle/wrapper/

# Копіюємо вихідний код
COPY backend/src ./src

# Запускаємо збірку
RUN gradle build -x test --no-daemon

# === Stage 2: Run the application ===
FROM openjdk:17-alpine
WORKDIR /app

# Копіюємо збірку
COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]