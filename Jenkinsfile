pipeline {
    agent any
    environment {
        HEROKU_API_KEY = credentials('heroku-api')
        IMAGE_NAME = 'giangnht19/fashfrezy'
        IMAGE_TAG = 'latest'
        APP_NAME = 'fashfrenzy'
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

                catchError(buildResult: 'SUCCESS') {
                    bat 'npm run test'
                }
            }
        }
        stage ('Deploy') {
            steps {
                echo 'Sign in Docker'
                withCredentials([string(credentialsId: 'dockerhub-pwd', variable: 'dockerhubpwd')]) {
                    bat 'docker login -u giangnht19 -p %dockerhubpwd%'
                }
                echo 'Deploying to Heroku'
                bat 'heroku container:login'
                bat 'docker tag %IMAGE_NAME%:%IMAGE_TAG% registry.heroku.com/%APP_NAME%/web'
                bat 'docker push registry.heroku.com/%APP_NAME%/web'
            }
        }
        stage('Release') {
            steps {
                echo 'Releasing the app'
                bat 'heroku container:release web -a %APP_NAME%'
            }
        }
    }
    post {
        always {
            echo 'Cleaning up'
            bat 'docker system prune -f'
            bat 'docker logout'
            echo 'Build completed'
        }
    }
}