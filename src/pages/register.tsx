import { Button } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import * as React from 'react';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
import { useRegisterMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { toErrorMap } from '../utils/toErrorMap';

type RegisterProps = {};

const RegisterPage: NextPage<RegisterProps> = ({}) => {
  const [{}, register] = useRegisterMutation();
  const router = useRouter();
  return (
    <Wrapper>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const registerResponse = await register({ options: values });
          if (registerResponse.data?.register.errors) {
            setErrors(toErrorMap(registerResponse.data.register.errors));
          } else if (registerResponse.data?.register.user) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              label='Username'
              name='username'
              placeholder='username'
            />
            <InputField label='Email' name='email' placeholder='email' />
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
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(RegisterPage);
