pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building the app'

                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/giangnht19/Ecommerce-Frontend.git']])

                bat 'cd Ecommerce-Frontend'

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
                echo 'Deploying to Docker Container'
                

                withCredentials([string(credentialsId: 'dockerhub-pwd', variable: 'dockerhubpwd')]) {
                    bat 'docker login -u giangnht19 -p %dockerhubpwd%'

                    bat 'docker push giangnht19/ecommerce:latest'

                    bat 'docker run -d -p 3000:3000 giangnht19/ecommerce:latest'
                }
            }
        }
        stage('Release') {
            steps {
                echo 'Releasing the app'
                
                bat 'git add .'

                bat 'git commit -m "Release"'

                bat 'git push heroku main'
            }
        }
    }
}