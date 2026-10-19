pipeline {
  agent any

  options {
    disableConcurrentBuilds()
    timeout(time: 15, unit: 'MINUTES')
    buildDiscarder(logRotator(numToKeepStr: '10'))
  }

  environment {
    PATH = "/usr/local/bin:/opt/homebrew/bin:${env.PATH}"
    CI = 'true'
  }

  stages {
    stage('Check environment') {
      steps {
        sh 'node --version'
        sh 'npm --version'
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Lint') {
      steps {
        sh 'npm run lint'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Cypress tests') {
      steps {
        sh 'rm -rf cypress/screenshots cypress/videos cypress/results'
        sh 'npm run test:e2e'
      }
      post {
        always {
            junit testResults: 'cypress/results/*.xml'
          archiveArtifacts(
            artifacts: 'cypress/screenshots/**/*',
            allowEmptyArchive: true
          )
        }
      }
    }
  }

  post {
    success {
      archiveArtifacts artifacts: 'dist/**/*'
      echo 'Lint, build, and Cypress tests passed.'
    }
    failure {
      echo 'Pipeline failed. Check the failed stage in Console Output.'
    }
  }
}