import { zodResolver } from '@hookform/resolvers/zod';
import { GetServerSidePropsContext } from 'next';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import InputField from '../components/formControl/InputField';
import Layout from '../components/Layout';

type FormInputs = {
  username: string;
};

const schema = z.object({
  username: z.string().trim().min(1).email(),
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
      <Layout title="Coupon specifications">
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <InputField name="Email" label="Email" form={form} />
          {/* <input type="submit" /> */}
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
