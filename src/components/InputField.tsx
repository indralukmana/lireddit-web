import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/core';
import { useField } from 'formik';
import * as React from 'react';

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

const InputField: React.FC<InputFieldProps> = ({ size: _, ...props }) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={Boolean(error)}>
      <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
      <Input
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default InputField;
