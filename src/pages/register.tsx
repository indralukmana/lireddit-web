import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
} from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import * as React from 'react';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';

type RegisterProps = {};

const RegisterPage: NextPage<RegisterProps> = ({}) => {
  return (
    <Wrapper>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => {
          console.log({ values });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              label='Username'
              name='username'
              placeholder='username'
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
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default RegisterPage;
