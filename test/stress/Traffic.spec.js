describe("traffic test", function() {
  this.timeout(10000000);
  const fs = require('fs');
  const spawn = require('child_process').spawn;
  let logPath = "test/stress/";
  if (process.env.STRESS_TAG) {
    logPath += process.env.STRESS_TAG+"/";
  }
  const clientLogPath = logPath+"output_client/";

  let baseURL;
  before(function(done) {
    baseURL = "http://localhost:"+sails.config.port+"/";
    setTimeout(function(){ 
      done();
    }, 10000);
  });

  let testParameter = {
    duration: "60",
    rate: "10",
    num: "20"
  };
  if (process.env.STRESS_DURATION) {
    testParameter.duration = process.env.STRESS_DURATION;
  }
  if (process.env.STRESS_RATE) {
    testParameter.rate = process.env.STRESS_RATE;
  }
  if (process.env.STRESS_NUM) {
    testParameter.num = process.env.STRESS_NUM;
  }

  let simpleTraffic = function(fileName,url,beforeTestMemoryUsage,done) {
    console.log("testing URL: "+url);
    const command = spawn('artillery', ['quick',
      '--duration',testParameter.duration,
      '--rate',testParameter.rate,
      '--num',testParameter.num,
      url,
      '--output',jsonFileName]);

    let jsonFileName = clientLogPath + fileName + ".json";
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

      if (code>=0) {
        console.log("full log available at "+logPath);
        done();
      } else {
        throw("artillery exit with error! log here: "+clientLogPath);
      }
    });
  }

  it("make an simple traffic test on index", async function(done) {
    try {
      const fileName = "index";
      let url = baseURL;

      let beforeTestMemoryUsage = process.memoryUsage();
      simpleTraffic(fileName,url,beforeTestMemoryUsage,done);

    } catch (e) {
      done(e);
    }
  });

  it("make an simple traffic test on lab", async function(done) {
    try {
      const fileName = "lab";
      let url = baseURL+"lab";

      let beforeTestMemoryUsage = process.memoryUsage();
      simpleTraffic(fileName,url,beforeTestMemoryUsage,done);

    } catch (e) {
      done(e);
    }
  });

  it("make an simple traffic test on wall", async function(done) {
    try {
      const fileName = "wall";
      let url = baseURL+"wall";

      let beforeTestMemoryUsage = process.memoryUsage();
      simpleTraffic(fileName,url,beforeTestMemoryUsage,done);

    } catch (e) {
      done(e);
    }
  });

  it("make an simple traffic test on event", async function(done) {
    try {
      const fileName = "event";
      let url = baseURL+"event";

      let beforeTestMemoryUsage = process.memoryUsage();
      simpleTraffic(fileName,url,beforeTestMemoryUsage,done);

    } catch (e) {
      done(e);
    }
  });

  it("make an simple traffic test on register", async function(done) {
    try {
      const fileName = "register";
      let url = baseURL+"register";

      let beforeTestMemoryUsage = process.memoryUsage();
      simpleTraffic(fileName,url,beforeTestMemoryUsage,done);

    } catch (e) {
      done(e);
    }
  });

  it("make an simple traffic test on login", async function(done) {
    try {
      const fileName = "login";
      let url = baseURL+"login";

      let beforeTestMemoryUsage = process.memoryUsage();
      simpleTraffic(fileName,url,beforeTestMemoryUsage,done);

    } catch (e) {
      done(e);
    }
  });

});
