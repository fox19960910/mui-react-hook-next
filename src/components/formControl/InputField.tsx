import { TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

type Props = {
  form: any;
  name: string;
  label: string;
  disabled?: boolean;
};

const InputField = (props: Props) => {
  const { form, name, label, disabled = false } = props;
  const { errors } = form.formState;
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <TextField
          {...field}
          id="outlined-error"
          name={name}
          label={label}
          disabled={disabled}
          error={!!errors[name]}
          helperText={errors[name] && errors[name].message}
        />
      )}
    />
  );
};

export default InputField;
