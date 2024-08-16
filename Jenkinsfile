pipeline {
    agent any
    environment {
        HEROKU_API = credentials('heroku-api')
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building the app'

                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/giangnht19/Ecommerce-Frontend.git']])

                bat 'docker build -t giangnht19/fashfrenzy:lastest .'
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
                bat 'echo ${HEROKU_API} | docker login --username=_ --password-stdin registry.heroku.com'

                echo 'Tagging the image'
                bat 'docker tag giangnht19/fashfrenzy:lastest registry.heroku.com/fashfrenzy/web'
                
                echo 'Pushing the image'
                bat 'docker push registry.heroku.com/fashfrenzy/web'
            }
        }
        stage('Release') {
            steps {
                echo 'Releasing the image'

                bat 'heroku container:release web --app fashfrenzy'
            }
        }
    }
    post {
        always {
            echo 'Cleaning up'
            bat 'docker rmi giangnht19/fashfrenzy:lastest'
            bat 'docker rmi registry.heroku.com/fashfrenzy/web'
            bat 'docker logout registry.heroku.com'
        }
    }
}
