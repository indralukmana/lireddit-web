import { Alert, AlertIcon, Button, Link } from '@chakra-ui/core';
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
import NextLink from 'next/link';

type ChangePasswordPageProps = {};

const ChangePasswordPage: NextPage<ChangePasswordPageProps> = ({}) => {
  const [tokenError, setTokenError] = React.useState('');
  const [{}, changePassword] = useChangePasswordMutation();
  const router = useRouter();

  const token =
    typeof router.query.token === 'string' ? router.query.token : '';

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
            const errorMap = toErrorMap(
              registerResponse.data.changePassword.errors
            );

            if ('token' in errorMap) {
              setTokenError(errorMap.token);
            }

            setErrors(errorMap);
          } else if (registerResponse.data?.changePassword.user) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {tokenError && (
              <Alert status='error'>
                <AlertIcon />
                {tokenError}
                <NextLink href='/forgot-password'>
                  <Link ml='1ch' textDecoration='underline'>
                    request token again
                  </Link>
                </NextLink>
              </Alert>
            )}
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
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(
  ChangePasswordPage
);
