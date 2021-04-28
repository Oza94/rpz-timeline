import React, { ReactNode } from "react";
import "./Button.css";

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

function Button({ children, className = "", onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={["Button", className].join(" ").trim()}
    >
      {children}
    </button>
  );
}

export default Button;
