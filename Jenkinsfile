
pipeline {
    agent any

    options {
        timestamps()
    }

    environment {
        APP_NAME = 'jenkins-cicd-demo-app'
        IMAGE_NAME = 'jenkins-cicd-demo:latest'
        APP_PORT = '3000'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo 'Source code checked out successfully.'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the Docker image...'
                bat 'docker build -t jenkins-cicd-demo:latest .'
            }
        }

        stage('Test') {
            steps {
                echo 'Checking JavaScript syntax...'
                bat 'docker run --rm --entrypoint node jenkins-cicd-demo:latest --check app.js'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                bat '''
                    docker rm -f jenkins-cicd-demo-app 2>NUL
                    docker run -d --name jenkins-cicd-demo-app -p 3000:3000 jenkins-cicd-demo:latest
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                echo 'Checking the deployed application...'
                bat '''
                    powershell -NoProfile -ExecutionPolicy Bypass -Command "$ok = $false; for ($i = 0; $i -lt 15; $i++) { try { $r = Invoke-WebRequest -Uri 'http://localhost:3000/health' -UseBasicParsing -TimeoutSec 2; if ($r.StatusCode -eq 200 -and $r.Content -match 'healthy') { $ok = $true; break } } catch {}; Start-Sleep -Seconds 2 }; if (-not $ok) { docker logs jenkins-cicd-demo-app; exit 1 }"
                '''
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: Build, test, and deployment completed.'
            echo 'Application URL: http://localhost:3000'
        }

        failure {
            echo 'FAILED: Check the Jenkins console output for details.'
        }
    }
}

