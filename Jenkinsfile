pipeline {
    agent any
    environment {
        // HEROKU_API_KEY = credentials('heroku-api')
        IMAGE_NAME = 'giangnht19/fashfrezy'
        IMAGE_TAG = 'latest'
        APP_NAME = 'fashfrenzy'
        EMAIL_RECIPIENT = 'gn601800@gmail.com'
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building the app'

                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'github-token', url: 'https://github.com/giangnht19/Ecommerce-Frontend.git']])

                bat 'npm install'
                bat 'docker build -t %IMAGE_NAME%:%IMAGE_TAG% .'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing the app'
                echo 'Using Jest to implement unit tests'
                bat 'npm test'
            }
        }
        stage ('Deploy') {
            steps {
                echo 'Login to Docker'
                withCredentials([string(credentialsId: 'dockerhub-pwd', variable: 'dockerhubpwd')]) {
                    bat 'docker login -u giangnht19 -p %dockerhubpwd%'
                    echo 'Pushing the image to Docker Hub'
                    bat 'docker push %IMAGE_NAME%:%IMAGE_TAG%'
                    // Pull the latest Docker images
                    sh "docker-compose -f docker-compose.yml pull"
                    
                    // Stop and remove existing containers
                    sh "docker-compose -f docker-compose.yml down"
                    
                    // Start containers with updated images
                    sh "docker-compose -f docker-compose.yml up -d"
                }
            }
        }
        stage('Release') {
            steps {
                echo 'Deploy Heroku Container Registry'   
                bat 'heroku container:login'
                // bat 'docker login --username=_ --password=%HEROKU_API_KEY% registry.heroku.com'
                bat 'docker tag %IMAGE_NAME%:%IMAGE_TAG% registry.heroku.com/%APP_NAME%/web'
                bat 'docker push registry.heroku.com/%APP_NAME%/web'
                echo 'Releasing the app'
                bat 'heroku container:release web -a %APP_NAME%'
            }
        }
    }
    post {
        always {
            echo 'Cleaning up'
            bat 'docker image prune -a -f'
            bat 'docker logout'
            echo 'Build completed'
        }
        success {
            script {
                mail to: "${env.EMAIL_RECIPIENT}",
                     subject: "Pipeline Status",
                     body: "${currentBuild.currentResult}",
                     attachmentsPattern: 'archive/**/*.log'
            }
        }
        failure {
            script {
                mail to: "${env.EMAIL_RECIPIENT}",
                     subject: "Build Failed",
                     body: " ${currentBuild.currentResult}. Check Jenkins Log for more information.",
                     attachmentsPattern: 'archive/**/*.log'
            }
        }
    }
}