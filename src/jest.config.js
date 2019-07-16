module.exports = {
    setupFilesAfterEnv: [
        '@testing-library/react/cleanup-after-each',
        '@testing-library/jest-dom/extend-expect',
        // ... other setup files ...
    ],
    // ... other options ...
};
