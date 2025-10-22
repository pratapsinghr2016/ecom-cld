/// <reference types="vite/client" />

// Vite-specific asset declarations
declare module "*.svg?url" {
  const value: string;
  export default value;
}

declare module "*.png?url" {
  const value: string;
  export default value;
}

declare module "*.jpg?url" {
  const value: string;
  export default value;
}

declare module "*.jpeg?url" {
  const value: string;
  export default value;
}

declare module "*.gif?url" {
  const value: string;
  export default value;
}

declare module "*.webp?url" {
  const value: string;
  export default value;
}

// Vite asset import with explicit URL
declare module "*?url" {
  const value: string;
  export default value;
}

// Vite raw imports
declare module "*?raw" {
  const value: string;
  export default value;
}

// Vite inline imports
declare module "*?inline" {
  const value: string;
  export default value;
}

// Vite worker imports
declare module "*?worker" {
  const WorkerConstructor: {
    new (): Worker;
  };
  export default WorkerConstructor;
}

declare module "*?worker&inline" {
  const WorkerConstructor: {
    new (): Worker;
  };
  export default WorkerConstructor;
}

// Environment variables
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_API_URL: string;
  readonly VITE_APP_ENV: "development" | "production" | "test";
  // Add more environment variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
