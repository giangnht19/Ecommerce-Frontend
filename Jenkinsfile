pipeline {
    agent any
    environment {
        HEROKU_API_KEY = credentials('heroku-api')
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building the app'

                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/giangnht19/Ecommerce-Frontend.git']])


                bat 'npm install'
                bat 'docker build -t giangnht19/ecommerce:latest .'
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
                echo 'Setup Heroku CLI'
                bat 'npm install -g heroku'
                echo 'Deploying to Heroku'
                withCredentials([string(credentialsId: 'heroku-api', variable : 'HEROKU_API' )]) {
                    bat 'docker login --username=_ --password=%HEROKU_API_KEY% registry.heroku.com'
                    bat 'docker tag giangnht19/ecommerce:latest registry.heroku.com/fashfrenzy/web'
                    bat 'docker push registry.heroku.com/fashfrenzy/web'
                }
        stage('Release') {
            steps {
                echo 'Releasing the app'
                    
                at 'heroku container:release web --app=fashfrenzy'
            }
        }
    }
}
