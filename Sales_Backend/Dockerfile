# Start with a base image that has Java installed
FROM eclipse-temurin:17-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the Spring Boot JAR file into the container
COPY target/Sales_Backend-0.0.1-SNAPSHOT.jar .

# Expose the port your Spring Boot application listens on
EXPOSE 8080

# Set the default command to run your application
ENTRYPOINT ["java", "-jar", "/Sales_Backend-0.0.1-SNAPSHOT.jar"]
