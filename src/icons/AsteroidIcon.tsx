import Image from "next/image";
import AsteroidImage from "@public/asteroid.png";

interface Props {
  size: "sm" | "lg";
  className?: string;
}

const sizes = {
  sm: 20,
  lg: 40,
};

export function AsteroidIcon({ size, className }: Props) {
  return (
    <Image
      className={className}
      src={AsteroidImage}
      alt="Иконка астероида"
      width={sizes[size]}
      height={sizes[size]}
    />
  );
}
