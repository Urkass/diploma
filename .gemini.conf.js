const isCI = require('is-ci');

const rootUrl = 'http://localhost:9001/';

const gridUrl = isCI
    ? ''
    : 'http://localhost:4444/wd/hub';

// const plugins = {
//     'html-reporter': {
//         enabled: true,
//         path: 'gemini/report/',
//         baseHost: rootUrl,
//     },
//     'gemini-optipng': true
// };

const browsers = {
    chrome: {
        desiredCapabilities: {
            browserName: 'chrome',
            chromeOptions: {
                args: ['--headless']
            }
        }
    }
}

module.exports = {
    // system: { plugins },
    rootUrl,
    gridUrl,
    browsers,
    sets: {
        Components: {
            files: 'buildScripts/runGeminiTest.js',
        }
    },
    httpTimeout: 60000,
    sessionRequestTimeout: 120000,
    sessionQuitTimeout: 5000,
    tolerance: 4,

    suitesPerSession: 20,
    sessionsPerBrowser: 20,
    windowSize: '1600x1080',
    retry: 3,
    compositeImage: true,
};
