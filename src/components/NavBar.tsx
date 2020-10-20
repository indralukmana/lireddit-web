import { Button, Flex, Link } from '@chakra-ui/core';
import * as React from 'react';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import NextLink from 'next/link';
import { isServer } from '../utils/isServer';

const NavBar = () => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

  let body = null;

  console.log({ data });

  if (fetching) {
    body = <p>Loading</p>;
  } else if (data?.me) {
    body = (
      <>
        <p>{data.me.username}</p>
        <Button
          onClick={() => logout()}
          variant='link'
          isLoading={logoutFetching}
        >
          Logout
        </Button>
      </>
    );
  } else if (!data?.me) {
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
