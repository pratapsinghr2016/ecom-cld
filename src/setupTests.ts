// Jest testing environment setup

// This file sets up the testing environment
// It must be referenced in jest config setupFilesAfterEnv

// Setup complete - this file is loaded by Jest
console.log("Test environment setup complete");

// Simple implementation of common Jest DOM matchers
if (typeof expect !== "undefined") {
  expect.extend({
    toBeInTheDocument(received: any) {
      const pass = received && document.body.contains(received);
      return {
        message: () =>
          pass
            ? `Expected element not to be in the document`
            : `Expected element to be in the document`,
        pass,
      };
    },
    toBeDisabled(received: any) {
      const pass = received && received.disabled === true;
      return {
        message: () =>
          pass
            ? `Expected element not to be disabled`
            : `Expected element to be disabled`,
        pass,
      };
    },
    toBeEnabled(received: any) {
      const pass = received && received.disabled === false;
      return {
        message: () =>
          pass
            ? `Expected element not to be enabled`
            : `Expected element to be enabled`,
        pass,
      };
    },
  });
}

export const setupComplete = true;
