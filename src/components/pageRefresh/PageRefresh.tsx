"use client";
import { useEffect } from "react";

const reloadInterval = 5*60*1000;

export const PageRefresh = () => {

  useEffect(() => {
    const reload = () => {
      window.location.reload();
    };
    const interval = setInterval(reload, reloadInterval);
    return () => clearInterval(interval);
  }, []);

  return (
    <></>
  );
};
