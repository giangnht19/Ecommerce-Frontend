pipeline {
    agent any
    
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
        stage('Deploy') {
            steps {
                echo 'Deploying the app'
                
                withCredentials([string(credentialsId: 'dockerhub-pwd', variable: 'dockerhubpwd')]) {
                    bat 'docker login -u giangnht19 -p %dockerhubpwd%'

                    bat 'docker push giangnht19/ecommerce:latest'
                }
            }
        }
        stage('Release') {
            steps {
                sshagent(['ssh-server']) {
                    // echo 'Releasing the app'
                    sh 'docker pull giangnht19/ecommerce'
                    sh 'docker stop ecommerce || true'
                    sh 'docker rm ecommerce || true'
                    sh 'docker run -d -p 3000:3000 --name ecommerce giangnht19/ecommerce:latest'
                }
            }
        }
    }
}
