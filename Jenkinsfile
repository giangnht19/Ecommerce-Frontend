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
                echo 'Releasing the app'
                withCredentials([string(credentialsId: 'heroku-api', variable: 'HEROKU_API_KEY')]) {
                    bat 'docker login --username=_ --password=%HEROKU_API_KEY% registry.heroku.com'
                    
                    // Push the Docker image to Heroku container registry
                    bat 'docker push registry.heroku.com/fashfrenzy/web'
                    
                    // Release the image
                    bat 'heroku container:release web --app fashfrenzy'
                }
            }
        }
    }
}
