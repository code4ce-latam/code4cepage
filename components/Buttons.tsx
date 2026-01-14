"use client";

import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: "#FA6A2D",
          color: "#ffffff",
        };
      case "secondary":
        return {
          backgroundColor: "#FA6A2D",
          color: "#ffffff",
        };
      case "outline":
        return {
          border: "2px solid #FA6A2D",
          color: "#FA6A2D",
          backgroundColor: "transparent",
        };
      default:
        return {
          backgroundColor: "#FA6A2D",
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
            e.currentTarget.style.backgroundColor = "#E85A1F";
          } else if (variant === "outline") {
            e.currentTarget.style.backgroundColor = "#FA6A2D";
            e.currentTarget.style.color = "#ffffff";
          }
        }}
        onMouseLeave={(e) => {
          if (variant === "primary") {
            e.currentTarget.style.backgroundColor = "#FA6A2D";
          } else if (variant === "outline") {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#FA6A2D";
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
      style={disabled ? { ...variantStyles, opacity: 0.6, cursor: 'not-allowed' } : variantStyles}
      disabled={disabled}
      onMouseEnter={(e) => {
        if (disabled) return;
        if (variant === "primary") {
          e.currentTarget.style.backgroundColor = "#E85A1F";
        } else if (variant === "outline") {
          e.currentTarget.style.backgroundColor = "#FA6A2D";
          e.currentTarget.style.color = "#ffffff";
        }
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        if (variant === "primary") {
          e.currentTarget.style.backgroundColor = "#FA6A2D";
        } else if (variant === "outline") {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "#FA6A2D";
        }
      }}
    >
      {children}
    </button>
  );
}

