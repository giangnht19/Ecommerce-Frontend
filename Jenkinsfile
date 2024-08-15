pipeline {
    agent any
    tools{
        maven 'maven_3_9_8'
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building the app'

                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/giangnht19/Ecommerce-Frontend.git']])

                bat 'mvn clean install'
                bat 'docker build -t giangnht19/ecommerce:lastest .'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing the app'

                bat 'mvn clean test'
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