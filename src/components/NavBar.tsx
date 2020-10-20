import { Flex, Link } from '@chakra-ui/core';
import * as React from 'react';
import { useMeQuery } from '../generated/graphql';
import NextLink from 'next/link';

const NavBar = () => {
  const [{ data, fetching }] = useMeQuery();

  let body = null;

  if (fetching) {
    body = <p>Loading</p>;
  } else if (data?.me?.username) {
    body = <p>{data.me.username}</p>;
  } else {
    body = (
      <>
        <NextLink href='/login'>
          <Link mr='5'>Login</Link>
        </NextLink>
        <NextLink href='/register'>
          <Link>Register</Link>
        </NextLink>
      </>
    );
  }

  return (
    <Flex backgroundColor='aqua' justifyContent='end' px='10' py='5'>
      {body}
    </Flex>
  );
};

export default NavBar;
