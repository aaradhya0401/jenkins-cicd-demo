
# Jenkins CI/CD Demo

## Overview

A simple Node.js web application demonstrating Continuous Integration
and Continuous Deployment (CI/CD) using Jenkins and Docker.

This project was created for the Elevate Labs DevOps Internship Task 2.

## Technologies Used

- Jenkins
- Docker
- Node.js
- Git and GitHub
- Jenkins Declarative Pipeline

## Pipeline Stages

1. **Checkout:** Retrieves source code from GitHub.
2. **Build:** Creates a Docker image for the application.
3. **Test:** Checks the JavaScript syntax inside the Docker image.
4. **Deploy:** Runs the application in a Docker container.
5. **Verify Deployment:** Checks the application's health endpoint.

## Run Locally with Docker

Build the image:

```bash
docker build -t jenkins-cicd-demo:latest .
```

Run the container:

```bash
docker run -d --name jenkins-cicd-demo-app -p 3000:3000 jenkins-cicd-demo:latest
```

Open the application:

http://localhost:3000

Health check:

http://localhost:3000/health

## Jenkins Setup

1. Install Jenkins and the required plugins.
2. Create a Pipeline item.
3. Set Definition to Pipeline script from SCM.
4. Select Git and enter this repository's URL.
5. Set the branch specifier to `*/main`.
6. Set the Script Path to `Jenkinsfile`.
7. Save and click Build Now.

## Notes

The deployment stage runs the application locally on the Jenkins host.
It is intended for learning and demonstration, not production deployment.
