"use client";
import React from "react";

interface AvatarTextProps {
    text: string;
    size?: number;
    type?: "square" | "circle";
    bg?: string;
    className?: string;
}

const AvatarText = ({
    text,
    size = 60,
    type = `square`,
    bg = `#FF964F`,
    className = ``,
}: AvatarTextProps) => {
    const fz = Math.round(size / 2);
    const rounded = type == "circle" ? "rounded-full" : "rounded-md";
    return (
        <div
            className={`${rounded} f-center text-white font-bold ${className}`}
            style={{
                backgroundColor: `${bg}`,
                width: `${size}px`,
                height: `${size}px`,
                fontSize: `${fz}px`,
            }}
        >
            <div>{text}</div>
        </div>
    );
};

export default AvatarText;
