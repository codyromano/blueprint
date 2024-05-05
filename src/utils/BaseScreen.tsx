import React from "react";
import "./BaseScreen.css";
import PositionLayer from "../screens/shared/PositionLayer";

export default function BaseScreen({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <PositionLayer alignItems="center">
      <div className={["base-screen", className].join(" ")}>{children}</div>
    </PositionLayer>
  );
}
