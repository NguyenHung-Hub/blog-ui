import React, { useState, ReactNode, ReactElement, useEffect } from "react";

interface TabProps {
  title: string;
  children: ReactNode;
}

interface TabsProps {
  children: ReactElement<TabProps>[];
  onChange?: (activeIndex: number) => void;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ children, onChange, className = "" }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    if (onChange) {
      onChange(index);
    }
  };

  useEffect(() => {
    if (onChange) {
      onChange(activeTab);
    }
  }, [activeTab, onChange]);

  return (
    <div className={`mx-auto max-w-lg ${className}`}>
      <div className="flex border-b border-gray-200">
        {children.map((child, index) => (
          <button
            key={index}
            className={`-mb-px px-4 py-2 text-sm font-semibold focus:outline-none ${
              activeTab === index
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => handleTabClick(index)}
          >
            {child.props.title}
          </button>
        ))}
      </div>
      <div className="">{children[activeTab]}</div>
    </div>
  );
};

export default Tabs;
