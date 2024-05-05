import React from "react";

export default function PositionLayer({
  children,
  alignItems = "center",
  justifyContent = "center",
  position = "fixed",
  zIndex = 1,
}: {
  children: React.ReactNode;
  alignItems: "center" | "flex-start" | "flex-end" | "stretch";
  justifyContent: "center" | "flex-start" | "flex-end" | "space-between";
  position: "fixed" | "absolute" | "relative";
  zIndex: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        alignItems,
        position,
        zIndex,
        justifyContent,
        justifyItems: "center",
        alignContent: "center",
      }}
    >
      {children}
    </div>
  );
}
