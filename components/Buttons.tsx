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

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: "#39005E",
          color: "#ffffff",
        };
      case "secondary":
        return {
          backgroundColor: "#F86828",
          color: "#ffffff",
        };
      case "outline":
        return {
          border: "2px solid #39005E",
          color: "#39005E",
          backgroundColor: "transparent",
        };
      default:
        return {
          backgroundColor: "#39005E",
          color: "#ffffff",
        };
    }
  };

  const variantStyles = getVariantStyles();

  const baseClassName = `${baseStyles} ${className}`;

  if (href) {
    return (
      <Link 
        href={href} 
        className={baseClassName}
        style={variantStyles}
        onMouseEnter={(e) => {
          if (variant === "primary") {
            e.currentTarget.style.backgroundColor = "#2D0047";
          } else if (variant === "outline") {
            e.currentTarget.style.backgroundColor = "#39005E";
            e.currentTarget.style.color = "#ffffff";
          }
        }}
        onMouseLeave={(e) => {
          if (variant === "primary") {
            e.currentTarget.style.backgroundColor = "#39005E";
          } else if (variant === "outline") {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#39005E";
          }
        }}
      >
        {children}
      </Link>
    );
  }

  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={baseClassName}
      style={variantStyles}
      onMouseEnter={(e) => {
        if (variant === "primary") {
          e.currentTarget.style.backgroundColor = "#2D0047";
        } else if (variant === "outline") {
          e.currentTarget.style.backgroundColor = "#39005E";
          e.currentTarget.style.color = "#ffffff";
        }
      }}
      onMouseLeave={(e) => {
        if (variant === "primary") {
          e.currentTarget.style.backgroundColor = "#39005E";
        } else if (variant === "outline") {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "#39005E";
        }
      }}
    >
      {children}
    </button>
  );
}

