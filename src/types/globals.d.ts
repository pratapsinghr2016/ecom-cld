/// <reference types="jest" />

// Jest global types
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveBeenCalledTimes(expected: number): R;
      toHaveBeenCalled(): R;
      toBeDisabled(): R;
    }
  }
}

// Testing Library extensions
declare namespace jest {
  interface Matchers<R> {
    toBeInTheDocument(): R;
    toBeVisible(): R;
    toBeDisabled(): R;
    toBeEnabled(): R;
    toHaveClass(className: string): R;
    toHaveTextContent(text: string | RegExp): R;
    toHaveValue(value: string | number): R;
  }
}

export {};
