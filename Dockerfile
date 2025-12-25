# ===== Stage 1: Frontend Build =====
FROM node:18 AS frontend

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build


# ===== Stage 2: Backend Build =====
FROM maven:3.9.6-eclipse-temurin-21 AS backend

WORKDIR /app
COPY backend/pom.xml .
RUN mvn dependency:go-offline
COPY backend/ ./
COPY --from=frontend /app/frontend/dist /app/src/main/resources/static
RUN mvn -B clean package -DskipTests


# ===== Stage 3: Runtime =====
FROM eclipse-temurin:21-jdk

WORKDIR /app
COPY --from=backend /app/target/backend-0.0.1.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]