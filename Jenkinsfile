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
                echo 'Building the docker image'

                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/giangnht19/Ecommerce-Frontend.git']])

                bat 'npm install'

                bat 'docker build -t ${env.IMAGE_NAME}:${env.IMAGE_TAG} .'
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
                bat 'echo ${env.HEROKU_API_KEY} | docker login --username=_ --password-stdin registry.heroku.com'

                echo 'Tagging the image'
                bat 'docker tag ${env.IMAGE_NAME}:${env.IMAGE_TAG} registry.heroku.com/${env.APP_NAME}/web'
                
                echo 'Pushing the image'
                bat 'docker push registry.heroku.com/${env.APP_NAME}/web'
            }
        }
        stage('Release') {
            steps {
                echo 'Releasing the image'

                bat 'heroku container:release web --app ${env.APP_NAME}'
            }
        }
    }
}
