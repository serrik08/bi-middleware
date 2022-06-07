pipeline {
    environment {
            imagename = "bancoganadero/router-service"
            registryCredential = 'docker_hub'
            dockerImage = ''
    }

    agent {
        node {
            label 'linux-builder'
        }
    }

    options {
        buildDiscarder logRotator(
                    daysToKeepStr: '16',
                    numToKeepStr: '10'
            )
    }

    stages {

        stage('Cleanup Workspace') {
            steps {
                cleanWs()
                sh """
                echo "Cleaned Up Workspace For Project"
                """
            }
        }

        stage('Code Checkout') {
            steps {
             script{
                checkout([$class: 'GitSCM', branches: [[name: '${BRANCH_NAME}']],
                         userRemoteConfigs: [[credentialsId: 'gitlab',
                         url: 'git@gitlab.bg.com.bo:desarrollo/bga/integracion/servicio-enrutador.git']]])
                }
             }
        }

        stage('Building image') {
            steps{
                script {
                    dockerImage = docker.build("$imagename:${BUILD_ID}.${BUILD_TIMESTAMP_SHORT}.${BRANCH_NAME}")
                }
            }
        }

        stage('Push Image') {
            steps{
                script {
                    docker.withRegistry( '', registryCredential ) {
                        dockerImage.push()
                        dockerImage.push('latest')
                    }
                }
            }
        }

        stage('Remove Unused docker image') {
            steps{
                sh "docker rmi $imagename:${BUILD_ID}.${BUILD_TIMESTAMP_SHORT}.${BRANCH_NAME}"
                sh "docker rmi $imagename:latest"
            }
        }

        stage('Variable replace') {
             when {
                        expression { BRANCH_NAME ==~ /(master|staging|develop)/ }
             }
             steps{
                script {
                    contentReplace(
                        configs: [
                            variablesReplaceConfig(
                                configs: [
                                    variablesReplaceItemConfig(
                                        name: 'ServiceCfgmap',
                                        value: 'router-service-cfgmap'
                                    ),
                                    variablesReplaceItemConfig(
                                        name: 'Namespace',
                                        value: 'pago-servicios'
                                    ),
                                    variablesReplaceItemConfig(
                                        name: 'TIGO_SERVICE',
                                        value: 'http://tigo-service:8080'
                                    ),
                                    variablesReplaceItemConfig(
                                        name: 'TIGO_MOBILE_SERVICE',
                                        value: 'http://tigo-mobile-service:8080'
                                    ),
                                    variablesReplaceItemConfig(
                                        name: 'ELFEC_SERVICE',
                                        value: 'http://elfec-service:8080'
                                    ),
                                    variablesReplaceItemConfig(
                                        name: 'YPFB_SERVICE',
                                        value: 'http://ypfb-service:8080'
                                    ),
                                    variablesReplaceItemConfig(
                                        name: 'PEXPRESS_SERVICE',
                                        value: 'PEXPRESS_SERVICE'
                                    ),
                                    variablesReplaceItemConfig(
                                        name: 'DELAPAZ_SERVICE',
                                        value: 'DELAPAZ_SERVICE'
                                    ),
                                    variablesReplaceItemConfig(
                                        name: 'COMTECO_SERVICE',
                                        value: 'COMTECO_SERVICE'
                                    ),
                                    variablesReplaceItemConfig(
                                        name: 'COTEL_SERVICE',
                                        value: 'COTEL_SERVICE'
                                    ),
                                    variablesReplaceItemConfig(
                                        name: 'PAGO_FACIL_SERVICE',
                                        value: 'http://pf-service:8080'
                                    ),
                                    variablesReplaceItemConfig(
                                        name: 'MONGO_URL',
                                        value: 'mongodb://bgadmin:mongopass123@172.16.1.123:32247'
                                    ),
                                    variablesReplaceItemConfig(
                                        name: 'MONGO_DB_NAME',
                                        value: 'INTEGRACION'
                                    ),
                                    variablesReplaceItemConfig(
                                        name: 'MONGO_COLLECTION',
                                        value: 'SRV_CRITERIOS_BUSQUEDA'
                                    ),
                                    variablesReplaceItemConfig(
                                        name: 'MONGO_COLLECTION_ETIQUETAS_TRADUCIDAS',
                                        value: 'SRV_ETIQUETAS_TRADUCIDAS'
                                    )
                                ],
                                fileEncoding: 'UTF-8',
                                filePath: './k8s/configmap.yml',
                                variablesPrefix: '{{',
                                variablesSuffix: '}}'
                        )]
                    )
                }
                script {
                    contentReplace(
                        configs: [
                            variablesReplaceConfig(
                                configs: [
                                    variablesReplaceItemConfig(
                                        name: 'ServiceCfgmap',
                                        value: 'router-service-cfgmap'
                                    ),
                                    variablesReplaceItemConfig(
                                        name: 'Namespace',
                                        value: 'pago-servicios'
                                    ),
                                    variablesReplaceItemConfig(
                                        name: 'ServiceName',
                                        value: 'router-service'
                                    ),
                                    variablesReplaceItemConfig(
                                        name: 'BaseImage',
                                        value: 'bancoganadero/router-service:${BUILD_ID}.${BUILD_TIMESTAMP_SHORT}.${BRANCH_NAME}'
                                    ),
                                    variablesReplaceItemConfig(
                                        name: 'ContainerPort',
                                        value: '8080'
                                    ),
                                    variablesReplaceItemConfig(
                                        name: 'Port',
                                        value: '8080'
                                    )

                                ],
                                fileEncoding: 'UTF-8',
                                filePath: './k8s/deployment.yml',
                                variablesPrefix: '{{',
                                variablesSuffix: '}}'
                        )]
                    )
                }
                script {
                    contentReplace(
                        configs: [
                            variablesReplaceConfig(
                                configs: [
                                    variablesReplaceItemConfig(
                                        name: 'Namespace',
                                        value: 'pago-servicios'
                                    )

                                ],
                                fileEncoding: 'UTF-8',
                                filePath: './k8s/namespace.yml',
                                variablesPrefix: '{{',
                                variablesSuffix: '}}'
                        )]
                    )
                }
             }
        }


        stage('Build Deploy Code DEV') {
            when {
                branch 'develop'
            }
            steps {
              script{
                kubernetesDeploy (configs: '**/k8s/*.yml',kubeconfigId: 'kubeconfigdev')
              }
            }
        }

        stage('Build Deploy Code STG') {
            when {
                branch 'staging'
            }
            steps {
              script{
                kubernetesDeploy (configs: '**/k8s/*.yml',kubeconfigId: 'kubeconfigtest')
              }
            }
        }

        stage('Build Deploy Code PRD') {
            when {
                branch 'master'
            }
            steps {
              script{
                kubernetesDeploy (configs: '**/k8s/*.yml',kubeconfigId: 'kubeconfigprod')
              }
            }
        }
    }
}