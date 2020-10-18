import { Box } from '@chakra-ui/core';
import * as React from 'react';

type WrapperProps = {
  variant?: 'small' | 'regular';
};

const Wrapper: React.FC<WrapperProps> = ({ children, variant = 'regular' }) => {
  return (
    <Box maxWidth='800px' mx='auto' my='50px'>
      {children}
    </Box>
  );
};

export default Wrapper;
