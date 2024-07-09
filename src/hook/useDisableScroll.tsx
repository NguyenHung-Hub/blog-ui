"use client";
import { useState, useEffect } from "react";

export default function useDisableScroll() {
  const [disableScroll, setDisableScroll] = useState(false);

  useEffect(() => {
    const body = document.body;
    if (disableScroll) {
      body.classList.add("no-scroll");
    } else {
      body.classList.remove("no-scroll");
    }

    return () => body.classList.remove("no-scroll");
  }, [disableScroll]);

  return { disableScroll, setDisableScroll };
}
