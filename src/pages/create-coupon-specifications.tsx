import { Button, Typography } from '@mui/material';
import { GetServerSidePropsContext } from 'next';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputField from '../components/formControl/InputField';
import StyledEmotionButton from '../components/StyledEmotionButton';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Layout from '../components/Layout';
import SelectDropdown from '../components/formControl/SelectDropdown';

type FormInputs = {
  name: string;
  issuance: string;
};

const schema = z.object({
  name: z.string().trim().min(1).max(20),
  issuance: z.string(),
});

type Schema = z.infer<typeof schema>;

const SSRPage: FC = () => {
  const form = useForm<FormInputs, Schema>({
    defaultValues: {
      name: '',
      issuance: '',
    },
    resolver: zodResolver(schema),
  });
  const handleSubmit: SubmitHandler<Schema> = (values: FormInputs) => {
    console.log('values', values);
  };
  return (
    <>
      <Layout title="Create coupon specifications">
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Typography variant="h6" gutterBottom>
            Create new coupon details
          </Typography>
          <InputField name="name" label="Coupon name" form={form} />
          <SelectDropdown name="issuance" label="Coupon issuance subject" form={form} data={['1', '2', '3']} />
          <input type="submit" />
        </form>
      </Layout>
    </>
  );
};

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  return {
    props: {},
  };
};

export default SSRPage;
