import React, { ReactNode } from "react";
import "./Card.css";

interface Props {
  children: ReactNode;
  className?: string;
}

function Card({ children, className = "" }: Props) {
  return <div className={["Card", className].join(" ").trim()}>{children}</div>;
}

export default Card;
