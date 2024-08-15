pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                echo 'Building the app'

                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/giangnht19/Ecommerce-Frontend.git']])

                // bat 'git clone https://github.com/giangnht19/Ecommerce-Frontend.git'

                bat 'npm install'
                bat 'docker build -t giangnht19/ecommerce:latest -f Dockerfile .'
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

                    bat 'docker stop ecommerce'

                    bat 'docker rm ecommerce'

                    bat 'docker run -d -p 3000:3000 --name ecommerce giangnht19/ecommerce:latest'
                }
            }
        }
        stage('Release') {
            steps {
                bat 'cd Ecommerce-Frontend'
                sh 'ssh -i "vockey.pem" ec2-user@ec2-13-211-97-86.ap-southeast-2.compute.amazonaws.com'
            }
        }
    }
}
