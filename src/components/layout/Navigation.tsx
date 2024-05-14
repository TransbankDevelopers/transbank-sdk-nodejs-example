"use client";
import { useEffect, useState } from "react";
import "./Navigation.css";
import cx from "classnames";

export type NavigationItem = {
  title: string;
  sectionId: string;
};

export type NavigationProps = {
  items: NavigationItem[];
};

export const Navigation = (props: NavigationProps) => {
  const [activeSection, setActiveSection] = useState(
    props.items.length ? props.items[0].sectionId : ""
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -70% 0px" }
    );

    props.items.forEach((item) => {
      const el = document.getElementById(item.sectionId);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      props.items.forEach((item) => {
        const el = document.getElementById(item.sectionId);
        if (el) {
          observer.unobserve(el);
        }
      });
    };
  }, [props.items]);

  if (!props.items.length) {
    return null;
  }

  return (
    <div className="nav-container">
      <div className="content">
        <div className="title">
          <span>Contenido en esta página</span>
        </div>
        <ul>
          {props.items.map((item, idx) => (
            <li key={idx}>
              <a
                href={`#${item.sectionId}`}
                className={cx({
                  active: activeSection === item.sectionId,
                })}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
