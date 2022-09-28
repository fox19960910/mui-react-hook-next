import { Checkbox, FormControlLabel, Radio } from '@mui/material';
import { Controller } from 'react-hook-form';

type Props = {
  form: any;
  name: string;
  label: string;
  disabled?: boolean;
};

const CheckboxField = (props: Props) => {
  const { form, name, label, disabled = false } = props;
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label={label}
          {...field}
          id={`checkbox-${name}`}
          name={name}
          disabled={disabled}
        />
      )}
    />
  );
};

export default CheckboxField;
