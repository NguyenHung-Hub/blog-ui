import React, { ReactNode } from "react";

interface TabProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const Tab: React.FC<TabProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export default Tab;
