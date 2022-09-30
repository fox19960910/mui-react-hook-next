import { FormControlLabel, Switch } from '@mui/material';
import { Controller } from 'react-hook-form';

type Props = {
  form: any;
  name: string;
  label: string;
  disabled?: boolean;
};

const SwitchField = (props: Props) => {
  const { form, name, label, disabled = false } = props;
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <Switch {...field} checked={field.value} />
        // <FormControlLabel
        //   control={<Switch {...field} checked={field.value} name={name} />}
        //   label={label}
        //   id={`input-${name}`}
        //   name={name}
        //   disabled={disabled}
        // />
      )}
    />
  );
};

export default SwitchField;
