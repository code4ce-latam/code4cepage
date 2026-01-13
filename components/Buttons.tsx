"use client";

import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  type?: "button" | "submit";
}

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-teal-primary text-white hover:bg-teal-dark focus:ring-teal-primary",
    secondary:
      "bg-orange-accent text-white hover:bg-orange-accent/90 focus:ring-orange-accent",
    outline:
      "border-2 border-teal-primary text-teal-primary hover:bg-teal-primary hover:text-white focus:ring-teal-primary",
  };

  const styles = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={styles}>
      {children}
    </button>
  );
}

