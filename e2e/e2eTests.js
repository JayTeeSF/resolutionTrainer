const E2ETestFramework = {
  testCount: 0,
  passCount: 0,
  failCount: 0,

  runTests: function (testModule) {
    console.log('Starting E2E tests...');
    for (const testName in testModule) {
      if (testName.startsWith('test_') && typeof testModule[testName] === 'function') {
        this.testCount++;
        console.log(`Running test: ${testName}`);
        try {
          testModule[testName](this.assert);
          this.passCount++;
          console.log(`${testName}: Passed`);
        } catch (error) {
          this.failCount++;
          console.error(`${testName}: Failed - ${error}`);
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

  assertVisibility: function (elementId, isVisible, message) {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element with ID '${elementId}' not found.`);
      throw new Error(`Element not found: ${elementId}`);
    }
    const displayStyle = getComputedStyle(element).display;
    const condition = isVisible ? (displayStyle !== 'none') : (displayStyle === 'none');
    if (!condition) {
      throw new Error(message);
    }
  },
};

// Define your test cases here
function test_subtract(assert) {
  // Example test case
  const result = 5 - 3;
  assert(result === 2, `Expected 2, got ${result}`);
}

function test_startScreenVisibility(assert) {
  console.log('Testing start screen visibility...');
  E2ETestFramework.assertVisibility('startScreen', true, 'Start screen should be visible on load');
}

function test_debugVisibility(assert) {
    console.log('Running debug visibility test...');
    document.body.style.backgroundColor = 'pink'; // Should change the background color to pink
    assert(true, 'Just a debug test'); // This should always pass
}

function test_gameStateTransition(assert) {
  changeGameState('personalLevel', 'communityLevel');
  const isCommunityVisible = document.getElementById('communityLevel').classList.contains('visible');
  assert(isCommunityVisible, 'Failed to transition from personal to community level');
}

window.testCases = {
  test_subtract,
  test_startScreenVisibility,
  test_debugVisibility,
  test_gameStateTransition,
  // Add more test cases here
};

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    console.log("e2eTests.js domcontentloaded and timeout done");
    E2ETestFramework.runTests(window.testCases);
  }, 1000); // Delay to ensure DOM is fully loaded
});
console.log("e2eTests.js loaded");
