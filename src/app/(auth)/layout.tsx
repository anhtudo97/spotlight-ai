import React, { PropsWithChildren } from 'react';

// type Props = {}

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      {children}
    </div>
  );
};

export default Layout;
