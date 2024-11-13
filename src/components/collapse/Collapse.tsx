"use client";
import React, { useState, useRef, useEffect } from "react";
import cx from "classnames";
import "./Collapse.css";

interface CollapseProps {
  label: string;
  children: React.ReactNode;
}
export default function Collapse({ label, children }: CollapseProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  return (
    <div>
      <button
        onClick={toggleCollapse}
        style={{ display: "block", width: "100%", textAlign: "left" }}
      >
        {label} {isOpen ? "▲" : "▼"}
      </button>
      <div
        ref={contentRef}
        className="cp-container"
        style={{ maxHeight: isOpen ? `${height}px` : "0" }}
      >
        <div className={cx("cp-content", { ["cp-open"]: isOpen })}>
          {children}
        </div>
      </div>
    </div>
  );
}
