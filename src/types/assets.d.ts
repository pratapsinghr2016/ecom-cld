// Asset type declarations for TypeScript

// Image formats
declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.jpeg" {
  const value: string;
  export default value;
}

declare module "*.gif" {
  const value: string;
  export default value;
}

declare module "*.webp" {
  const value: string;
  export default value;
}

declare module "*.avif" {
  const value: string;
  export default value;
}

declare module "*.ico" {
  const value: string;
  export default value;
}

declare module "*.bmp" {
  const value: string;
  export default value;
}

// SVG files
declare module "*.svg" {
  const value: string;
  export default value;
}

declare module "*.svg?react" {
  import { ComponentType, SVGProps } from "react";
  const value: ComponentType<SVGProps<SVGSVGElement>>;
  export default value;
}

// Video formats
declare module "*.mp4" {
  const value: string;
  export default value;
}

declare module "*.webm" {
  const value: string;
  export default value;
}

declare module "*.ogg" {
  const value: string;
  export default value;
}

declare module "*.avi" {
  const value: string;
  export default value;
}

declare module "*.mov" {
  const value: string;
  export default value;
}

// Audio formats
declare module "*.mp3" {
  const value: string;
  export default value;
}

declare module "*.wav" {
  const value: string;
  export default value;
}

declare module "*.flac" {
  const value: string;
  export default value;
}

declare module "*.aac" {
  const value: string;
  export default value;
}

// Font formats
declare module "*.woff" {
  const value: string;
  export default value;
}

declare module "*.woff2" {
  const value: string;
  export default value;
}

declare module "*.eot" {
  const value: string;
  export default value;
}

declare module "*.ttf" {
  const value: string;
  export default value;
}

declare module "*.otf" {
  const value: string;
  export default value;
}

// Document formats
declare module "*.pdf" {
  const value: string;
  export default value;
}

// Data formats
declare module "*.json" {
  const value: any;
  export default value;
}

declare module "*.csv" {
  const value: string;
  export default value;
}

declare module "*.xml" {
  const value: string;
  export default value;
}

declare module "*.yaml" {
  const value: any;
  export default value;
}

declare module "*.yml" {
  const value: any;
  export default value;
}

// Text formats
declare module "*.txt" {
  const value: string;
  export default value;
}

declare module "*.md" {
  const value: string;
  export default value;
}

// Web formats
declare module "*.html" {
  const value: string;
  export default value;
}

declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.sass" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.less" {
  const content: Record<string, string>;
  export default content;
}

// Binary formats
declare module "*.wasm" {
  const value: string;
  export default value;
}

// Archive formats
declare module "*.zip" {
  const value: string;
  export default value;
}

declare module "*.tar" {
  const value: string;
  export default value;
}

declare module "*.gz" {
  const value: string;
  export default value;
}
