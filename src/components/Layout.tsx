import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-[#F9F5F2]">
      {/* Main Content */}
      <div>
        {children}
      </div>
    </div>
  );
};

export default Layout; 