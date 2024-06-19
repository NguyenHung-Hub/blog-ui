"use client";
import React, { useEffect, useState } from "react";
import slugify from "slugify";

const TableOfContent = () => {
  const [html, setHtml] = useState<Array<{ id: string; text: string }>>([]);

  useEffect(() => {
    setHtml([]);
    const h2 = document.querySelectorAll("h2");
    h2.forEach((h) => {
      h.id = slugify(h.innerText, { lower: true, strict: true });
    });
    const c = document.querySelector("#post-content");
    c?.childNodes.forEach((i) => {
      if (["H2", "H3"].includes(i.nodeName)) {
        const s = i as HTMLHeadingElement;
        const id = slugify(s.innerText, { lower: true, strict: true });
        s.id = id;

        setHtml((prev) => [...prev, { id, text: s.innerText }]);
      }
    });
  }, []);

  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.scrollBy(0, -90);
    }
  };

  return (
    <>
      {html.length > 0 && (
        <div className="mb-8">
          <header className="mb-4 flex">
            <h3 className="text-lg font-semibold">Mục lục</h3>
            <div className="mx-2 mt-6 flex-1 border-t border-t-gray-400"></div>
          </header>
          {html.map((i) => {
            return (
              <div
                key={i.id}
                className="mt-1 text-sm"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToElement(i.id);
                }}
              >
                {/* <a href={`#${i.id}`}> */}
                <h4
                  className={`select-none hover:cursor-pointer hover:font-semibold hover:text-blue-500`}
                >
                  {i.text}
                </h4>
                {/* </a> */}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default TableOfContent;
