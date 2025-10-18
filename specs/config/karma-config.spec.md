# Karma Configuration

Angular 17 CLI compliant Karma test runner configuration with Jasmine framework and Angular DevKit build integration.

## Target

[@generate](../../karma.conf.js)

## Capabilities

### Jasmine Test Framework Integration

Uses Jasmine testing framework with Angular DevKit build system integration for seamless Angular component and service testing.

### ChromeHeadless Browser Testing

Configures ChromeHeadless as the default test browser for automated and CI environments while maintaining compatibility with other browsers.

### Test Reporting and Coverage

Provides comprehensive test reporting with karma-jasmine-html-reporter for interactive test results and karma-coverage for code coverage analysis.

### Development-Friendly Configuration

Enables file watching, automatic test re-runs on changes, and persistent test results display for optimal development workflow.

## API

```javascript { .api }
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // configuration options
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/ultimate-comparison'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    browsers: ['ChromeHeadless'],
    restartOnFileChange: true,
    autoWatch: true,
    singleRun: false
  });
};
```

## Dependencies

### Angular DevKit Build Angular

Angular CLI build system integration for Karma test runner.
[@use](@angular-devkit/build-angular)

### Karma Testing Framework

Core Karma test runner with Jasmine framework support.
[@use](karma)

### Karma Plugins

Essential Karma plugins for Jasmine integration, Chrome browser launcher, HTML reporting, and coverage analysis.
[@use](karma-jasmine)
[@use](karma-chrome-launcher)
[@use](karma-jasmine-html-reporter)
[@use](karma-coverage)