import { Button } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import * as React from 'react';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
import { useCreatePostMutation } from '../generated/graphql';
import { useAuth } from '../hooks/useAuth';
import { createUrqlClient } from '../utils/createUrqlClient';

type CreatePostPageProps = {};

const CreatePostPage: NextPage<CreatePostPageProps> = ({}) => {
  const [{}, createPost] = useCreatePostMutation();
  const router = useRouter();

  useAuth();

  return (
    <Wrapper>
      <Formik
        initialValues={{ title: '', text: '' }}
        onSubmit={async (values, {}) => {
          const result = await createPost({ input: values });

          if (!result.error) {
            router.replace('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField label='Post Title' name='title' placeholder='Title' />
            <InputField
              textarea
              label='Post Content'
              name='text'
              placeholder='text'
            />
            <Button
              mt='4'
              variantColor='teal'
              type='submit'
              isLoading={isSubmitting}
            >
              Create Post
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(CreatePostPage);
