console.log("e2eTests.js loaded");

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
        this.displayResults();
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

    displayResults: function () {
        const resultText = `Test Summary:\nTotal Tests: ${this.testCount}\nPassed: ${this.passCount}\nFailed: ${this.failCount}`;
        alert(resultText); // Display results in an alert box

        // Alternatively, display the results on the page
        const resultsDiv = document.createElement('div');
        resultsDiv.textContent = resultText;
        document.body.appendChild(resultsDiv);
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
    const result = 5 - 3;
    assert(result === 2, `Expected 2, got ${result}`);
}

function test_startScreenVisibility(assert) {
    E2ETestFramework.assertVisibility('startScreen', true, 'Start screen should be visible on load');
}

function test_debugVisibility(assert) {
    document.body.style.backgroundColor = 'pink'; // Should change the background color to pink
    assert(true, 'Just a debug test'); // This should always pass
}

window.e2eTests = {
    test_subtract,
    test_startScreenVisibility,
    test_debugVisibility,
    // Add more test cases here
};

window.onload = () => {
    console.log("Window fully loaded, running E2E tests.");
    E2ETestFramework.runTests(window.e2eTests);
};

console.log("e2eTests.js eof");
