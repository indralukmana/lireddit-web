import { Box, Flex, Heading, Link, Stack, Text } from '@chakra-ui/core';
import { withUrqlClient } from 'next-urql';
import { title } from 'process';
import React from 'react';
import Layout from '../components/Layout';
import { usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import NextLink from 'next/link';

const IndexPage = () => {
  const [{ data, fetching: postsFetching }] = usePostsQuery({
    variables: {
      limit: 10,
    },
  });

  return (
    <Layout>
      <Flex alignItems='center'>
        <Heading>Lireddit</Heading>
        <NextLink href='/create-post'>
          <Link ml='auto'>Create Post</Link>
        </NextLink>
      </Flex>
      <Stack>
        {data
          ? data.posts.map((post) => (
              <Box key={post.id} p={5} shadow='md' borderWidth='1px'>
                <Heading fontSize='xl'>{post.title}</Heading>
                <Text mt={4}>{post.textSnippet}</Text>
              </Box>
            ))
          : null}
      </Stack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(IndexPage);
