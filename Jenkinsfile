pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                echo 'Building the app'

                git branch: 'main', url: 'https://github.com/giangnht19/Vue.js2-TodoApp.git'
                
                bat 'docker build -t giangnht19/todo-app:lastest -f Dockerfile .'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing the app'

                bat 'docker run giangnht19/todo-app:lastest npm run test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying the app'
                
                bat 'docker run -d -p 8081:8081 giangnht19/todo-app:lastest'
            }
        }
    }
}