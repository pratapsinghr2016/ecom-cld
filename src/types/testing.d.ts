// Type declarations for testing libraries

declare module "@testing-library/jest-dom" {
  export interface CustomMatchers<R = unknown> {
    toBeInTheDocument(): R;
    toBeVisible(): R;
    toBeEmptyDOMElement(): R;
    toBeInvalid(): R;
    toBeRequired(): R;
    toBeValid(): R;
    toBeDisabled(): R;
    toBeEnabled(): R;
    toBePartiallyChecked(): R;
    toHaveAttribute(attr: string, value?: string): R;
    toHaveClass(className: string): R;
    toHaveFocus(): R;
    toHaveFormValues(values: Record<string, any>): R;
    toHaveStyle(css: Record<string, any> | string): R;
    toHaveTextContent(text: string | RegExp): R;
    toHaveValue(value: string | number | string[]): R;
    toHaveDisplayValue(value: string | string[]): R;
    toBeChecked(): R;
    toHaveErrorMessage(text: string | RegExp): R;
    toHaveDescription(text: string | RegExp): R;
  }
}

declare module "@testing-library/react" {
  export function render(ui: React.ReactElement, options?: any): any;
  export const screen: {
    getByRole: (role: string, options?: any) => HTMLElement;
    getByTestId: (testId: string) => HTMLElement;
    getByText: (text: string | RegExp) => HTMLElement;
    queryByRole: (role: string, options?: any) => HTMLElement | null;
    queryByTestId: (testId: string) => HTMLElement | null;
    queryByText: (text: string | RegExp) => HTMLElement | null;
  };
  export const fireEvent: {
    click: (element: HTMLElement) => void;
    change: (element: HTMLElement, options?: any) => void;
    submit: (element: HTMLElement) => void;
  };
}

// Jest global functions
declare global {
  function describe(name: string, fn: () => void): void;
  function it(name: string, fn: () => void): void;
  function test(name: string, fn: () => void): void;
  function expect(value: any): jest.Matchers<any>;
  function beforeEach(fn: () => void): void;
  function afterEach(fn: () => void): void;
  function beforeAll(fn: () => void): void;
  function afterAll(fn: () => void): void;

  namespace jest {
    interface Mock<T = any, Y extends any[] = any> {
      (...args: Y): T;
      mockClear(): void;
      mockReset(): void;
      mockRestore(): void;
      mockImplementation(fn: (...args: Y) => T): this;
      mockReturnValue(value: T): this;
      mockReturnValueOnce(value: T): this;
    }

    interface MockedFunction<T extends (...args: any[]) => any>
      extends Mock<ReturnType<T>, Parameters<T>> {
      (...args: Parameters<T>): ReturnType<T>;
    }

    interface Matchers<R> {
      toBe(expected: any): R;
      toEqual(expected: any): R;
      toStrictEqual(expected: any): R;
      toBeNull(): R;
      toBeUndefined(): R;
      toBeDefined(): R;
      toBeTruthy(): R;
      toBeFalsy(): R;
      toContain(expected: any): R;
      toHaveLength(expected: number): R;
      toHaveBeenCalled(): R;
      toHaveBeenCalledTimes(expected: number): R;
      toHaveBeenCalledWith(...args: any[]): R;
      toHaveBeenLastCalledWith(...args: any[]): R;
      toHaveBeenNthCalledWith(nthCall: number, ...args: any[]): R;
      toHaveReturned(): R;
      toHaveReturnedTimes(expected: number): R;
      toHaveReturnedWith(expected: any): R;
      toHaveLastReturnedWith(expected: any): R;
      toHaveNthReturnedWith(nthCall: number, expected: any): R;
      toThrow(expected?: string | RegExp | Error): R;
      toThrowError(expected?: string | RegExp | Error): R;
      // Jest DOM matchers
      toBeInTheDocument(): R;
      toBeVisible(): R;
      toBeEmptyDOMElement(): R;
      toBeInvalid(): R;
      toBeRequired(): R;
      toBeValid(): R;
      toBeDisabled(): R;
      toBeEnabled(): R;
      toBePartiallyChecked(): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveClass(className: string): R;
      toHaveFocus(): R;
      toHaveFormValues(values: Record<string, any>): R;
      toHaveStyle(css: Record<string, any> | string): R;
      toHaveTextContent(text: string | RegExp): R;
      toHaveValue(value: string | number | string[]): R;
      toHaveDisplayValue(value: string | string[]): R;
      toBeChecked(): R;
      toHaveErrorMessage(text: string | RegExp): R;
      toHaveDescription(text: string | RegExp): R;
      not: Matchers<R>;
    }

    function fn<T extends (...args: any[]) => any>(
      implementation?: T
    ): MockedFunction<T>;
    function fn(): MockedFunction<(...args: any[]) => any>;
  }

  const jest: {
    fn: typeof jest.fn;
  };
}
