# Use the latest MySQL image from Docker Hub
FROM mysql:latest

# Environment variables to configure MySQL
ENV MYSQL_ROOT_PASSWORD=password

# Expose MySQL port
EXPOSE 3306
