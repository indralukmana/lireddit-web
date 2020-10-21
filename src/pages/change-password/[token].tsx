import { Button } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { GetServerSideProps, NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import * as React from 'react';
import InputField from '../../components/InputField';
import Wrapper from '../../components/Wrapper';
import { useChangePasswordMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { toErrorMap } from '../../utils/toErrorMap';

type ChangePasswordPageProps = { token: string };

const ChangePasswordPage: NextPage<ChangePasswordPageProps> = ({ token }) => {
  const [{}, changePassword] = useChangePasswordMutation();
  const router = useRouter();
  return (
    <Wrapper>
      <Formik
        initialValues={{ newPassword: '' }}
        onSubmit={async (values, { setErrors }) => {
          const registerResponse = await changePassword({
            token,
            newPassword: values.newPassword,
          });
          if (registerResponse.data?.changePassword.errors) {
            setErrors(toErrorMap(registerResponse.data.changePassword.errors));
          } else if (registerResponse.data?.changePassword.user) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              label='New Password'
              name='newPassword'
              placeholder='New Password'
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.params?.token;

  return {
    props: {
      token,
    },
  };
};

export default withUrqlClient(createUrqlClient, { ssr: false })(
  ChangePasswordPage
);
