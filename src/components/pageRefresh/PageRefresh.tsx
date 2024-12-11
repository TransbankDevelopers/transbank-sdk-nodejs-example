"use client";

import { useEffect } from "react";


export const PageRefresh = () => {

  useEffect(() => {
    const reload = async () => {
      console.log('refresh token!!!');
      window.location.reload();
    };
    const interval = setInterval(reload, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <></>
  );
};
