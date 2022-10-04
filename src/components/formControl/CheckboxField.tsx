import { Checkbox, FormControlLabel, Radio } from '@mui/material';
import { Key } from 'react';
import { Controller } from 'react-hook-form';

type Props = {
  form: any;
  name: string;
  label: string;
  disabled?: boolean;
  key?: Key;
};

const CheckboxField = (props: Props) => {
  const { form, name, label, disabled = false, key } = props;
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormControlLabel
          key={key}
          control={<Checkbox {...field} checked={field.value} />}
          label={label}
          disabled={disabled}
        />
      )}
    />
  );
};

export default CheckboxField;
