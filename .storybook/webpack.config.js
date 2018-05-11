// load the default config generator.
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');
const createWebpackConfig = require('../buildScripts/createWebpackConfig');

module.exports = (baseConfig, env) => {
    const config = genDefaultConfig(baseConfig, env);
    const projectConfig = createWebpackConfig({ isStorybook: true });
    config.module.rules = [].concat(projectConfig.module.rules, config.module.rules);
    config.resolve.extensions = [].concat(projectConfig.resolve.extensions, config.resolve.extensions);
    return config;
};
