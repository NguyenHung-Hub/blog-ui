"use client";
import { useEffect } from "react";
import "highlight.js/styles/atom-one-dark.min.css";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import typescript from "highlight.js/lib/languages/typescript";
import shell from "highlight.js/lib/languages/shell";
import yaml from "highlight.js/lib/languages/yaml";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("css", css);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("shell", shell);
hljs.registerLanguage("yaml", yaml);

const Highlight = () => {
  useEffect(() => {
    setTimeout(() => {
      hljs.highlightAll();
    }, 800);
  }, []);

  return null;
};

export default Highlight;
