import React from "react";

const LoginLayout = ({ leftContent, rightContent }) => {
  return (
    <div className="flex">
      <div
        className="min-h-screen hidden md:block w-6 bg-no-repeat bg-cover"
        style={{
          backgroundColor: "orange",
        }}
      >
        {leftContent}
      </div>
      <div className="surface-section w-full md:w-6 p-6 md:p-8 min-h-screen">
        {rightContent}
      </div>
    </div>
  );
};

export default LoginLayout;
