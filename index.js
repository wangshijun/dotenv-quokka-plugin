module.exports = {
  before: (config) => {
    const path = require('path');
    const dotenv = require('dotenv-flow');
    const findUp = require('findup-sync');

    // see https://www.npmjs.com/package/dotenv-flow for all supported options
    const pluginConfig = config.dotenv || {};
    if (pluginConfig.path) {
      if (path.isAbsolute(pluginConfig.path)) {
        dotenv.config({ ...pluginConfig, path: pluginConfig.path });
      } else {
        dotenv.config({ ...pluginConfig, path: path.join(process.cwd(), pluginConfig.path) });
      }
    } else {
      // detect dotenv location automatically form current file
      const envPath = findUp('.env', { cwd: path.dirname(config.filePath) });
      dotenv.config({ ...pluginConfig, path: envPath ? path.dirname(envPath) : process.cwd() });
    }
  },
};
