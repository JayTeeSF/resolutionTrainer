// game.js

function subtract(a, b) {
    return a - b;
}

function changeGameState(currentState, newState) {
    const currentStateDiv = document.getElementById(currentState);
    const newStateDiv = document.getElementById(newState);

    if (currentStateDiv && newStateDiv) {
        currentStateDiv.classList.remove('visible');
        currentStateDiv.classList.add('hidden');
        newStateDiv.classList.remove('hidden');
        newStateDiv.classList.add('visible');
    }
}

function resolveConflict(player, conflictType) {
    // Placeholder implementation
    // Replace with actual conflict resolution logic
    if (conflictType === 'Resource Scarcity') {
        return 'resource_allocation'; // Example outcome
    }
    // ... other conflict types
    return 'unknown';
}

