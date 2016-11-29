/**
 * Utils Controller
 */
const os = require('os-utils');
const disk = require('diskusage');

module.exports = {
  sysInfo: function(req, res) {

    let diskUsage = 0;
    disk.check('/', function(err, info) {
      diskUsage = ( Number(info.available) / Number(info.total) ).toFixed(4);
    });

    res.ok({
      sysUptime:          os.sysUptime(),
      processUptime:      os.processUptime(),
      totalmem:           os.totalmem(),
      freemem:            os.freemem(),
      freememPercentage:  os.freememPercentage(),
      loadavg:            [os.loadavg(1), os.loadavg(5), os.loadavg(15)],
      cpuCount:           os.cpuCount(),
      platform:           os.platform(),
      residentSet:        process.memoryUsage(),
      diskUsage:          diskUsage,
      session:            req.session,
    });
  },

};
