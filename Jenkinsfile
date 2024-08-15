pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                echo 'Building the app'

                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/giangnht19/Ecommerce-Frontend.git']])

                bat 'npm install'
                bat 'docker build -t giangnht19/ecommerce:latest -f Dockerfile .'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing the app'

                bat 'npm run test --ci'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying the app'
                
                withCredentials([string(credentialsId: 'dockerhub-pwd', variable: 'dockerhubpwd')]) {
                    bat 'docker login -u giangnht19 -p %dockerhubpwd%'

                    bat 'docker push giangnht19/ecommerce:latest'
                }
            }
        }
    }
}
