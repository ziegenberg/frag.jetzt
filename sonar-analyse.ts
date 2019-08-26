const scanner = require('sonarqube-scanner');

scanner(
  {
    serverUrl: 'https://scm.thm.de/sonar/',
    options: {
      'sonar.projectKey': 'de.thm.arsnova:frag.jetzt',
      'sonar.projectName': 'frag.jetzt',
      'sonar.projectVersion': '1.0-SNAPSHOT',
      'sonar.sources': 'src',
      'sonar.tests': 'tests',
      'sonar.typescript.lcov.reportPaths': 'coverage/lcov.info',
      'sonar.sourceEncoding': 'UTF-8'
    },
  },
  () => {
    // callback is required
  }
);
