import React from "react";
import PositionLayer from "./PositionLayer";
import "../BuyFurniture.css";

type Props = {
  title: string;
  onSelectClose: () => void;
  horizontalScroll: boolean;
  children: React.ReactNode;
};

export default function Modal({
  children,
  onSelectClose,
  title,
  horizontalScroll = true,
}: Props) {
  return (
    <PositionLayer
      zIndex={501}
      position="fixed"
      justifyContent="center"
      alignItems="center"
    >
      <div
        className="hscroll-menu"
        style={
          horizontalScroll
            ? {
                overflowX: "scroll",
              }
            : {}
        }
      >
        <header
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "space-between",
          }}
          className="hscroll-heading"
        >
          <h1
            style={{
              fontSize: "1.5rem",
            }}
          >
            {title}
          </h1>

          <button
            style={{ fontSize: "1.5rem", width: "50px" }}
            onClick={onSelectClose}
          >
            x
          </button>
        </header>

        {children}
      </div>
    </PositionLayer>
  );
}
