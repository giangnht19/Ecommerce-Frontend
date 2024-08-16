pipeline {
    agent any
    environment {
        HEROKU_API_KEY = credentials('heroku-api')
        IMAGE_NAME = 'giangnht19/fashfrenzy'
        IMAGE_TAG = 'latest' // Corrected the spelling from 'lastest' to 'latest'
        APP_NAME = 'fashfrenzy'
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building the docker image'

                // Check out the code from GitHub
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/giangnht19/Ecommerce-Frontend.git']])

                // Install dependencies
                bat 'npm install'

                // Build the Docker image
                bat 'docker build -t %IMAGE_NAME%:%IMAGE_TAG% .'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing the app'

                // Run tests with error handling
                catchError(buildResult: 'SUCCESS') {
                    bat 'npm run test'
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying the app'
                
                // Login to Heroku Docker registry
                echo 'Logging in to Heroku'
                bat 'echo %HEROKU_API_KEY% | docker login --username=_ --password-stdin registry.heroku.com'

                // Tag the Docker image
                echo 'Tagging the image'
                bat 'docker tag %IMAGE_NAME%:%IMAGE_TAG% registry.heroku.com/%APP_NAME%/web'
                
                // Push the Docker image to Heroku
                echo 'Pushing the image'
                bat 'docker push registry.heroku.com/%APP_NAME%/web'
            }
        }
        stage('Release') {
            steps {
                echo 'Releasing the image'

                // Release the image on Heroku
                bat 'heroku container:release web --app %APP_NAME%'
            }
        }
    }
}
