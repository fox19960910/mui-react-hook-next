import { TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

type Props = {
  form: any;
  name: string;
  placeholder: string;
  disabled?: boolean;
};

const InputField = (props: Props) => {
  const { form, name, placeholder, disabled = false } = props;
  const { errors } = form.formState;
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <TextField
          {...field}
          id={`input-${name}`}
          name={name}
          disabled={disabled}
          error={!!errors[name]}
          helperText={errors[name] && errors[name].message}
          size="small"
          placeholder={placeholder}
        />
      )}
    />
  );
};

export default InputField;
