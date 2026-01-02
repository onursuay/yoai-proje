import Image from "next/image";

interface BrandIconProps {
  name: "meta" | "google";
  size?: 16 | 18 | 20;
  className?: string;
}

const iconMap = {
  meta: "/icons/meta.svg",
  google: "/icons/google.svg",
} as const;

const sizeClasses = {
  16: "h-4 w-4",
  18: "h-[18px] w-[18px]",
  20: "h-5 w-5",
} as const;

export function BrandIcon({ name, size = 16, className }: BrandIconProps) {
  return (
    <Image
      src={iconMap[name]}
      alt={name === "meta" ? "Meta" : "Google"}
      width={size}
      height={size}
      className={className || sizeClasses[size]}
      priority
    />
  );
}

