import * as React from 'react';
import NavBar from './NavBar';
import Wrapper from './Wrapper';

type LayoutProps = {};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default Layout;
