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
    this.displayTestResults(); // Call the new method to update UI
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

  displayTestResults: function () {
    const resultsContainer = document.getElementById('test-results');
    if (!resultsContainer) return;

    resultsContainer.innerHTML = `
      <div class="mb-4">
        <span class="font-bold">Total Tests:</span> ${this.testCount}
      </div>
      <div class="mb-4">
        <span class="font-bold text-green-500">Passed:</span> ${this.passCount}
        ${this.passCount > 0 ? '<i class="fas fa-check-circle text-green-500"></i>' : ''}
      </div>
      <div class="mb-4">
        <span class="font-bold text-red-500">Failed:</span> ${this.failCount}
        ${this.failCount > 0 ? '<i class="fas fa-times-circle text-red-500"></i>' : ''}
      </div>
    `;

    if (this.failCount === 0) {
      resultsContainer.innerHTML += '<div class="text-green-500"><i class="fas fa-check-circle"></i> All tests passed!</div>';
    } else {
      resultsContainer.innerHTML += '<div class="text-red-500"><i class="fas fa-times-circle"></i> Some tests failed. See console for details.</div>';
    }
  },
};

// Attach TestFramework to the global window object
window.TestFramework = TestFramework;
