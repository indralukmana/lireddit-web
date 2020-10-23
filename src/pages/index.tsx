import { Box, Button, Flex, Heading, Link, Stack, Text } from '@chakra-ui/core';
import { withUrqlClient } from 'next-urql';
import { title } from 'process';
import React from 'react';
import Layout from '../components/Layout';
import { usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import NextLink from 'next/link';

const IndexPage = () => {
  const [variables, setVariables] = React.useState({
    limit: 40,
    cursor: null as null | string,
  });

  const [{ data, fetching: postsFetching }] = usePostsQuery({
    variables,
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
          ? data.posts.posts.map((post) => (
              <Box key={post.id} p={5} shadow='md' borderWidth='1px'>
                <Heading fontSize='xl'>{post.title}</Heading>
                <Text mt={4}>{post.textSnippet}</Text>
              </Box>
            ))
          : null}
      </Stack>
      {data?.posts.hasMore && (
        <Flex justify='center' align='center' marginY='10'>
          <Button
            onClick={() =>
              setVariables({
                limit: variables.limit,
                cursor:
                  data?.posts.posts[data.posts.posts.length - 1].createdAt,
              })
            }
          >
            Load More
          </Button>
        </Flex>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(IndexPage);
