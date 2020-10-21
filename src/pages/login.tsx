import { Button } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import * as React from 'react';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
import { useLoginMutation, useRegisterMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { toErrorMap } from '../utils/toErrorMap';

type LoginPageProps = {};

const LoginPage: NextPage<LoginPageProps> = ({}) => {
  const [{}, login] = useLoginMutation();
  const router = useRouter();
  return (
    <Wrapper>
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const registerResponse = await login(values);
          if (registerResponse.data?.login.errors) {
            setErrors(toErrorMap(registerResponse.data.login.errors));
          } else if (registerResponse.data?.login.user) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              label='Username or Email'
              name='usernameOrEmail'
              placeholder='username or email'
            />
            <InputField
              label='Password'
              name='password'
              placeholder='password'
              type='password'
            />
            <Button
              mt='4'
              variantColor='teal'
              type='submit'
              isLoading={isSubmitting}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(LoginPage);
