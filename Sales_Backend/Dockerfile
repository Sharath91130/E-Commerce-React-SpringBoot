FROM openjdk:21

WORKDIR /app

# Copy the built JAR file into the container
COPY target/Sales_Backend-0.0.1-SNAPSHOT.jar  /app/Sales_Backend-0.0.1-SNAPSHOT.jar

# Expose port 9090
EXPOSE 9090

# Correct syntax for ENTRYPOINT
ENTRYPOINT ["java", "-jar", "/app/Sales_Backend-0.0.1-SNAPSHOT.jar"]
