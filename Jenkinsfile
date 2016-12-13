node {

  try {
    // slackSend message: "started ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
    echo "BRANCH_NAME = " + env.BRANCH_NAME
    def BRANCH_NAME = env.BRANCH_NAME;
    def preview = false;
    def skiptest = false;
    def deploy = false;

    try{

      if(BRANCH_NAME == "release-labfnp"){
        deploy = true;
        // skiptest = true;
        preview = false;
      } else {
        timeout(time:10, unit:'SECONDS') {
            stage 'preview'
            input message: "wanner preview?", ok: "start preview"
        }
        preview = true;

      }

      if(deploy){
        timeout(time:5, unit:'SECONDS') {
            stage 'do test'
            input message: "do test?", ok: "do test"
        }
        skiptest = false;

      }


      if(preview){
        timeout(time:5, unit:'SECONDS') {
            stage 'skip test'
            input message: "skip test?", ok: "skip test"
        }
        skiptest = true;
      }



    }catch(e){

    }

    stage 'checkout project'
    // git url: 'https://github.com/trunk-studio/cargocms.git', branch: 'develop'
    checkout scm


    if(!skiptest){
      stage 'check env'
      sh "node -v"

      stage 'build project'
      sh "npm install && npm run build"

      stage 'test project'
      sh "npm run test-ci"
      // step([$class: 'JUnitResultArchiver', testResults: 'test-results.xml'])
      // step([$class: 'CloverPublisher', cloverReportDir: 'coverage', cloverReportFileName: 'clover.xml'])
      sh "npm run test-e2e-docker"
    }

    if(preview) sh "npm run preview"

    if(deploy) sh "make deploy-beta"

    // stage 'run project'
    // sh "npm run pm2-start"
    //
    // try{
    //   stage 'Approve, go production'
    //   def url = 'http://localhost:1337/'
    //   input message: "Does staging at $url look good? ", ok: "Deploy to production"
    // }finally{
    //   sh "npm run pm2-stop"
    // }
    //
    // stage 'package production'
    // sh "make package-production"
    // step([$class: 'ArtifactArchiver', artifacts: 'sailsSampleProd.tar.gz', fingerprint: true])
    //
    // stage 'deploy production'
    // sh "make deploy-production-legacy"
    //
    // stage 'restart production'
    // sh "make restart-production"

    slackSend color: 'good', message: "success ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
  }catch(e){
    slackSend color: 'danger', message: "fail ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
    throw e;
  }

}
