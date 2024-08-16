pipeline {
    agent any
    environment {
        HEROKU_API_KEY = credentials('heroku-api')
        IMAGE_NAME = 'giangnht19/fashfrenzy'
        IMAGE_TAG = 'lastest'
        APP_NAME = 'fashfrenzy'
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building the app'

                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/giangnht19/Ecommerce-Frontend.git']])

                bat 'docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .'
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
        stage('Deploy') {
            steps {
                echo 'Deploying the app'
                
                echo 'Logging in to Heroku'
                bat 'echo ${HEROKU_API_KEY} | docker login --username=_ --password-stdin registry.heroku.com'

                echo 'Tagging the image'
                bat 'docker tag ${IMAGE_NAME}:${IMAGE_TAG} registry.heroku.com/${APP_NAME}/web'
                
                echo 'Pushing the image'
                bat 'docker push registry.heroku.com/${APP_NAME}/web'
            }
        }
        stage('Release') {
            steps {
                echo 'Releasing the image'

                bat 'heroku container:release web --app ${APP_NAME}'
            }
        }
    }
    post {
        always {
            echo 'Cleaning up'
            bat 'docker rmi $IMAGE_NAME:$IMAGE_TAG'
            bat 'docker rmi registry.heroku.com/${APP_NAME}/web'
            bat 'docker logout registry.heroku.com'
        }
    }
}
