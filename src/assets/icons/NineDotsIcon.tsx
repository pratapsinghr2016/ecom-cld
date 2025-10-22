import { SVGProps } from "react";

interface NineDotsIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const NineDotsIcon = ({
  size = 24,
  color = "currentColor",
  ...props
}: NineDotsIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    {...props}
  >
    <rect x="3" y="3" width="5" height="5" fill={color} />
    <rect x="10" y="3" width="5" height="5" fill={color} />
    <rect x="17" y="3" width="5" height="5" fill={color} />
    <rect x="3" y="10" width="5" height="5" fill={color} />
    <rect x="10" y="10" width="5" height="5" fill={color} />
    <rect x="17" y="10" width="5" height="5" fill={color} />
    <rect x="3" y="17" width="5" height="5" fill={color} />
    <rect x="10" y="17" width="5" height="5" fill={color} />
    <rect x="17" y="17" width="5" height="5" fill={color} />
  </svg>
);

export default NineDotsIcon;
