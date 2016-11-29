describe("traffic test", function() {
  this.timeout(10000000);
  const fs = require('fs');
  const logPath = "test/stress/"
  const clientLogPath = logPath+"output_client/";
  const spawn = require('child_process').spawn;
  let baseURL;
  before(function(done) {
    baseURL = "http://localhost:"+sails.config.port+"/";
    done();
  });

  it("make an simple traffic test on index", async function(done) {
    try {
      const fileName = "index";
      let url = baseURL;
      let jsonFileName = clientLogPath + fileName + ".json";

      let beforeTestMemoryUsage = process.memoryUsage();
      console.log("testing URL: "+url);
      const command = spawn('artillery', ['quick',
        '--duration','60',
        '--rate','10',
        '-n','20',
        url,
        '--output',jsonFileName]);

      command.stdout.on('data', (data) => {
        let stdoutFile = clientLogPath + fileName + "-stdout.txt";
        fs.appendFile(stdoutFile, data , 'utf8')
      });

      command.stderr.on('data', (data) => {
        let stdoutFile = clientLogPath + fileName + "-stderr.txt";
        fs.appendFile(stdoutFile, data , 'utf8')
      });

      command.on('close', (code) => {
        let afterTestMemoryUsage = process.memoryUsage();
        console.log("=== before traffic test memoryUsage ===");
        console.log(beforeTestMemoryUsage);
        console.log("=== after traffic test memoryUsage ===");
        console.log(afterTestMemoryUsage);

        console.log(`child process exited with code ${code}`);
        if (code>=0) {
          console.log("full log available at "+logPath);
          done();
        } else {
          throw("process exit with error!");
        }
      });

    } catch (e) {
      done(e);
    }
  });
});
