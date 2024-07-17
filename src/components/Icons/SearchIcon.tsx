import React from "react";

const SearchIcon = ({ color = "currentColor", className = "" }) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_3_122916)">
        <path
          d="M23.5612 21.4454L18.9161 16.7983C22.3918 12.1535 21.4441 5.57052 16.7993 2.0948C12.1546 -1.38092 5.57156 -0.433205 2.09584 4.21157C-1.37988 8.85634 -0.432167 15.4393 4.21261 18.9151C7.94367 21.7071 13.0682 21.7071 16.7993 18.9151L21.4464 23.5622C22.0304 24.1462 22.9773 24.1462 23.5612 23.5622C24.1452 22.9782 24.1452 22.0314 23.5612 21.4474L23.5612 21.4454ZM10.5447 18.0181C6.41664 18.0181 3.07023 14.6717 3.07023 10.5437C3.07023 6.4156 6.41664 3.06919 10.5447 3.06919C14.6727 3.06919 18.0192 6.4156 18.0192 10.5437C18.0148 14.6698 14.6709 18.0137 10.5447 18.0181Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_3_122916">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SearchIcon;
