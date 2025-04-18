# 1. Start from official Maven + OpenJDK 11
FROM maven:3.9.6-eclipse-temurin-11

# 2. Switch to root to install Docker CLI & git
USER root
RUN apt-get update \
    && apt-get install -y docker.io git \
    && rm -rf /var/lib/apt/lists/*

# 3. Drop back to the unprivileged "maven" user
USER maven

WORKDIR /home/maven
ENTRYPOINT ["bash", "-ilc"]