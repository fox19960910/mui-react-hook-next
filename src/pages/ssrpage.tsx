import { Button, Typography } from '@mui/material';
import { GetServerSidePropsContext } from 'next';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputField from '../components/formControl/InputField';
import StyledEmotionButton from '../components/StyledEmotionButton';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

type FormInputs = {
  username: string;
};

const schema = z.object({
  username: z.string().trim().min(1),
});

type Schema = z.infer<typeof schema>;

const SSRPage: FC = () => {
  const form = useForm<FormInputs, Schema>({
    defaultValues: {
      username: '',
    },
    resolver: zodResolver(schema),
  });
  const handleSubmit: SubmitHandler<Schema> = (values: FormInputs) => {
    console.log('values', values);
  };
  return (
    <>
      <Typography variant="h4">Welcome to the server!</Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="username" label="User Name" form={form} />
        {/* <input type="submit" /> */}
      </form>
    </>
  );
};

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  return {
    props: {},
  };
};

export default SSRPage;
