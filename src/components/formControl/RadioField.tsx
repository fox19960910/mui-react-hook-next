import { FormControlLabel, Radio } from '@mui/material';
import { Controller } from 'react-hook-form';

type Props = {
  form: any;
  name: string;
  label: string;
  disabled?: boolean;
};

const RadioField = (props: Props) => {
  const { form, name, label, disabled = false } = props;
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormControlLabel
          control={<Radio />}
          label={label}
          {...field}
          id={`input-${name}`}
          name={name}
          disabled={disabled}
        />
      )}
    />
  );
};

export default RadioField;
