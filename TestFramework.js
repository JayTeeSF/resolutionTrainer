// TestFramework.js

const TestFramework = {
  testCount: 0,
  passCount: 0,
  failCount: 0,

  runTests: function (testModule) {
    console.log('Running tests...');
    for (const testName in testModule) {
      if (testName.startsWith('test_') && typeof testModule[testName] === 'function') {
        this.testCount++;
        try {
          testModule[testName](this.assert);
          this.passCount++;
          console.log(`${testName}: Passed`);
        } catch (error) {
          this.failCount++;
          console.error(`${testName}: Failed - ${error.message}`);
        }
      }
    }
    this.printSummary();
  },

  assert: function (condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  },

  printSummary: function () {
    console.log('\nTest Summary:');
    console.log(`  Total Tests: ${this.testCount}`);
    console.log(`  Passed: ${this.passCount}`);
    console.log(`  Failed: ${this.failCount}`);
  },
};

// Export the TestFramework for use in other files
// module.exports = TestFramework;

// Attach TestFramework to the global window object
window.TestFramework = TestFramework;
