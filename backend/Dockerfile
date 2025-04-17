## Stage 1: Build the application
#FROM maven:3.9-eclipse-temurin-17-alpine AS builder
#
#WORKDIR /app
#COPY pom.xml .
#COPY src ./src
#RUN mvn clean package -DskipTests
#
## Stage 2: Run the application
#FROM eclipse-temurin:17-jre-alpine
#
#WORKDIR /app
#
#COPY --from=builder /app/target/*.jar app.jar
#
## Environment variables (customize as needed)
#ENV SPRING_PROFILES_ACTIVE=prod
#ENV SERVER_PORT=8080
#ENV JAVA_OPTS="-Xmx512m -Xms256m"
#
#EXPOSE 8080
#
## Enhanced entrypoint with Java options
#ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS} -jar app.jar"]
#

# # ---------- Stage 1: Build ----------
    FROM maven:3.9.3-eclipse-temurin-17 AS builder

    WORKDIR /app
    COPY . .
    RUN mvn clean package -DskipTests

    # ---------- Stage 2: Run ----------
    # FROM gcr.io/distroless/java17-debian12
    # FROM --platform=linux/amd64 gcr.io/distroless/java17
    FROM gcr.io/distroless/java17


    WORKDIR /app
    COPY --from=builder /app/target/*.jar app.jar

    CMD ["app.jar"]

