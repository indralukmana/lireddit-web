import { Box, Button } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { GetServerSideProps, NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import * as React from 'react';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
import {
  useChangePasswordMutation,
  useForgotPasswordMutation,
} from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { toErrorMap } from '../utils/toErrorMap';

type ForgotPasswordPageProps = {};

const ForgotPasswordPage: NextPage<ForgotPasswordPageProps> = ({}) => {
  const [completed, setCompleted] = React.useState(false);
  const [{}, forgotPassword] = useForgotPasswordMutation();
  const router = useRouter();
  return (
    <Wrapper>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values, {}) => {
          await forgotPassword({
            email: values.email,
          });
          setCompleted(true);
        }}
      >
        {({ isSubmitting }) =>
          completed ? (
            <Box>
              We'll send you an email for resetting the password if your email
              registered in our system
            </Box>
          ) : (
            <Form>
              <InputField
                label='Email'
                name='email'
                placeholder='email'
                type='email'
              />
              <Button
                mt='4'
                variantColor='teal'
                type='submit'
                isLoading={isSubmitting}
              >
                Send Forgot Password
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(
  ForgotPasswordPage
);
