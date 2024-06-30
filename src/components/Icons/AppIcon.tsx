import React from "react";

const AppIcon = ({ color = "currentColor", className = "" }) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_3_126875)">
        <path
          d="M7 0H4C1.79086 0 0 1.79086 0 4V7C0 9.20914 1.79086 11 4 11H7C9.20914 11 11 9.20914 11 7V4C11 1.79086 9.20914 0 7 0Z"
          fill={color}
        />
        <path
          d="M20 0H17C14.7909 0 13 1.79086 13 4V7C13 9.20915 14.7909 11 17 11H20C22.2091 11 24 9.20915 24 7V4C24 1.79086 22.2091 0 20 0Z"
          fill={color}
        />
        <path
          d="M7 13H4C1.79086 13 0 14.7909 0 17V20C0 22.2092 1.79086 24 4 24H7C9.20914 24 11 22.2092 11 20V17C11 14.7909 9.20914 13 7 13Z"
          fill={color}
        />
        <path
          d="M20 13H17C14.7909 13 13 14.7909 13 17V20C13 22.2092 14.7909 24 17 24H20C22.2091 24 24 22.2092 24 20V17C24 14.7909 22.2091 13 20 13Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_3_126875">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default AppIcon;
