import fs from 'fs';
export default (configName) => {
  var result = {}
  var files = fs.readdirSync('./config')
  for (var dirName of files) {
    let isDir = fs.statSync('./config/' + dirName).isDirectory();
    if (isDir) {
      let customRouteConfigFile = __dirname+"/../" + dirName + '/'+configName;
      let hasCustomRouteConfigFile = fs.existsSync(customRouteConfigFile);
      if (hasCustomRouteConfigFile) {
        var customConfig = require(__dirname+"/../" + dirName + '/'+configName);

        result = {
          ...result,
          ...customConfig
        }
      }
    }
  }

  return result;
};
