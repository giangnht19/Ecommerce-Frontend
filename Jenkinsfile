pipeline {
    agent any
    environment {
        HEROKU_API_KEY = credentials('heroku-api')
        IMAGE_NAME = 'giangnht19/fashfrezy'
        IMAGE_TAG = 'latest'
        APP_NAME = 'fashfrenzy'
        EMAIL_RECIPIENT = 'gn601800@gmail.com'
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building the app'

                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'github-token', url: 'https://github.com/giangnht19/Ecommerce-Frontend.git']])

                bat 'npm install'
                bat 'docker build -t %IMAGE_NAME%:%IMAGE_TAG% .'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing the app'
                bat 'npm test'
            }
            post {
                success {
                    script {
                        archiveArtifacts artifacts: '**/*', excludes: ''
                        mail to: "${env.EMAIL_RECIPIENT}",
                             subject: "Jenkins Pipeline: Tests Stage - ${currentBuild.currentResult}",
                             body: "The Unit and Integration Tests stage has completed with status: ${currentBuild.currentResult}.",
                             attachmentsPattern: 'archive/**/*.log'
                    }
                }
                failure {
                    script {
                        archiveArtifacts artifacts: '**/*', excludes: ''
                        mail to: "${env.EMAIL_RECIPIENT}",
                             subject: "Jenkins Pipeline: Tests Stage - ${currentBuild.currentResult}",
                             body: "Unit tests failed. ${currentBuild.currentResult}.",
                             attachmentsPattern: 'archive/**/*.log'
                    }
                }
            }
        }
        stage ('Deploy') {
            steps {
                echo 'Login to Docker'
                echo 'Deploy Heroku Container Registry'   
                withCredentials([string(credentialsId: 'dockerhub-pwd', variable: 'dockerhubpwd')]) {
                    bat 'docker login -u giangnht19 -p %dockerhubpwd%'
                    bat 'docker push %IMAGE_NAME%:%IMAGE_TAG%'
                    bat 'heroku container:login'
                    bat 'docker tag %IMAGE_NAME%:%IMAGE_TAG% registry.heroku.com/%APP_NAME%/web'
                    bat 'docker push registry.heroku.com/%APP_NAME%/web'
                }
            }
        }
        stage('Release') {
            steps {
                echo 'Releasing the app'
                
                bat 'heroku container:release web -a %APP_NAME%'
            }
        }
    }
    post {
        always {
            echo 'Cleaning up'
            bat 'docker image prune -a -f'
            bat 'docker logout'
            echo 'Build completed'
        }
        success {
            script {
                archiveArtifacts artifacts: '**/*', excludes: ''
                mail to: "${env.EMAIL_RECIPIENT}",
                     subject: "Pipeline Status",
                     body: "${currentBuild.currentResult}",
                     attachmentsPattern: 'archive/**/*.log'
            }
        }
        failure {
            script {
                archiveArtifacts artifacts: '**/*', excludes: ''
                mail to: "${env.EMAIL_RECIPIENT}",
                     subject: "Build Failed",
                     body: "${currentBuild.currentResult}",
                     attachmentsPattern: 'archive/**/*.log'
            }
        }
    }
}