import React from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  fit?: "cover" | "contain" | "fill" | "scale-down" | "none";
  color?: string; // For SVGs with currentColor
}

const Image: React.FC<ImageProps> = ({
  src,
  alt = "",
  width,
  height,
  fit = "cover",
  color, // Extract color prop
  className = "",
  loading = "lazy",
  style,
  ...props
}) => {
  // Check if this is an SVG
  const isSVG = src.endsWith(".svg") || src.includes("data:image/svg");

  const imageStyle: React.CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width || "auto",
    height: typeof height === "number" ? `${height}px` : height || "auto",
    objectFit: fit,
    display: "block",
    ...(color && { color }), // Set color for currentColor SVGs
    // For SVGs without currentColor, use filter as fallback
    ...(color &&
      isSVG && {
        filter: "invert(1)", // Temporarily disable filter
      }),
    ...style,
  };

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      className={className}
      style={imageStyle}
      {...props}
    />
  );
};

export default Image;
