import { yupResolver } from '@hookform/resolvers/yup';
import { Button, makeStyles, TextField } from '@mui/material';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface Inputs {
  personalInfo: {
    username: string;
    email: string;
  };
  password: string;
}

interface Props {
  onModalClose: () => void;
}

function Form({ onModalClose }: Props): JSX.Element {
  const { handleSubmit, control, formState } = useForm<Inputs>({
    mode: 'onBlur',
    defaultValues: {
      personalInfo: {
        username: '',
        email: '',
      },
      password: '',
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log('onSubmit', data);
    return null;
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="personalInfo.username"
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextField
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              type="text"
              variant="filled"
              placeholder="username"
              ref={ref}
            />
          )}
        />

        <Controller
          name="personalInfo.email"
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextField
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              ref={ref}
              type="email"
              variant="filled"
              placeholder="Email"
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextField
              type="password"
              variant="filled"
              placeholder="Password"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              ref={ref}
            />
          )}
        />

        <Button variant="contained" onClick={onModalClose}>
          Cancel
        </Button>
        <Button variant="contained" type="submit" color="primary">
          Submit
        </Button>
      </form>
    </>
  );
}

export default Form;
