// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    autoWatch: false,
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'), // For Brave
      require('karma-firefox-launcher'), // For Firefox
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    preprocessors: {
      'src/**/*.js': 'coverage'
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/inote-web-interface'),
      subdir: '.',
      reporters: [
        {
          type: 'lcov',
          subdir: 'lcov'
        },
        {
          type: 'text-summary',
          subdir: 'summary' ,
          file: 'coverage.txt'
        }
      ]
    },
    reporters: ['progress', 'coverage', 'kjhtml'],
    browsers: [
      'ChromeHeadless',
      'FirefoxHeadless'
    ],
    chromeBin: '/usr/bin/brave-browser',
    restartOnFileChange: false,
    retryLimit: 0
  });
};
