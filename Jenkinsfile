pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                echo 'Building the app'

                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/giangnht19/Ecommerce-Frontend.git']])

                bat 'npm install'
                bat 'docker build -t giangnht19/ecommerce:lastest -f Dockerfile .'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing the app'

                timeout(time: 1, unit: 'MINUTES') {
                    bat 'npm test'
                }

                echo 'Finish testing'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying the app'
                
                withCredentials([string(credentialsId: 'dockerhub-pwd', variable: 'dockerhubpwd')]) {
                    bat 'docker login -u giangnht19 -p %dockerhubpwd%'

                    bat 'docker push giangnht19/ecommerce:lastest'
                }
            }
        }
    }
}