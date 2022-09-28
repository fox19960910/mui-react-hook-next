import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@mui/material';
import { GetServerSidePropsContext } from 'next';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import CheckboxField from '../components/formControl/CheckboxField';
import FormControl from '../components/formControl/FormControl';
import InputField from '../components/formControl/InputField';
import RadioField from '../components/formControl/RadioField';
import SelectDropdown from '../components/formControl/SelectDropdown';
import SwitchField from '../components/formControl/SwitchField';
import Layout from '../components/Layout';
import HeadSubTitle from '../components/Typography/HeadSubTitle';
import HeadTitle from '../components/Typography/HeadTitle';

const fieldWidth = 210;
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
          <HeadTitle>Create new coupon details</HeadTitle>
          <Box>
            <HeadSubTitle>Basic Information</HeadSubTitle>
            <FormControl id="name" label="Name of coupon details">
              <InputField name="name" placeholder="Please enter" form={form} />
            </FormControl>
            <FormControl id="issuance" label="Coupon issuance subject">
              <SwrapSelectIssuance>
                <SelectDropdown name="issuance1" form={form} data={['1', '2', '3']} />
                <SelectDropdown name="issuance2" form={form} data={['1', '2', '3']} />
                <InputField name="issuance-value" placeholder="0 %" form={form} />
              </SwrapSelectIssuance>
            </FormControl>
          </Box>

          <Box>
            <HeadSubTitle>Coupon benefits</HeadSubTitle>
            <FormControl
              id="cpBenefits"
              label="Coupon benefits
"
            >
              <SwrapSelectIssuance>
                <SelectDropdown name="benefitSelect" form={form} data={['1', '2', '3']} />
                <InputField name="benefitValue" placeholder="0 %" form={form} />
                <InputField name="maxDiscount" placeholder="Maximum discount" form={form} />
              </SwrapSelectIssuance>
            </FormControl>
            <FormControl id="paymentAcount" label="Minimum payment amount">
              <InputField name="name" placeholder="Please enter" form={form} />
            </FormControl>
            <FormControl id="limitUse" label="Limit number of uses">
              <SwitchField label="Per memberId" form={form} name="isLimitUserActive" />
              <InputField name="limitUse" placeholder="Can be used " form={form} />
            </FormControl>
            <FormControl id="maximumUse" label="Maximum number of uses">
              <SwitchField label="Max Person" form={form} name="isMaximumUse" />
              <InputField name="maximumUse" placeholder="Can be used " form={form} />
            </FormControl>
          </Box>

          <Box>
            <HeadSubTitle>Subjects to apply coupons</HeadSubTitle>
            <FormControl id="subjects" label="Subjects to apply coupons">
              <RadioField name="subjectAll" label="All" form={form} />
              <RadioField name="subjectFranchise" label="Franchise (brand)" form={form} />
              <RadioField name="subjectCategory" label="Category" form={form} />
              <RadioField name="subjectRestaurant" label="Restaurant" form={form} />
              <RadioField name="subjectYomart" label="Yomart" form={form} />
            </FormControl>
          </Box>

          <Box>
            <HeadSubTitle>Conditions for using coupons</HeadSubTitle>
            <FormControl id="oderType" label="Order type">
              <RadioField name="express" label="Express (OD)" form={form} />
              <RadioField name="delivery" label="Delivery (VD)" form={form} />
              <RadioField name="packing" label="Packing" form={form} />
              <RadioField name="preOder" label="Pre-order" form={form} />
            </FormControl>
            <FormControl id="yogipass" label="Yogi Pass">
              <CheckboxField name="yogipass" label="Available for copy during Yogi Pass" form={form} />
            </FormControl>
            <FormControl id="useChanel" label="Use channel">
              <SwitchField label="" form={form} name="useChanel" />
            </FormControl>
            <FormControl id="useCityRegion" label="Use City/Region">
              <SwitchField label="" form={form} name="useCityRegion" />
            </FormControl>
            <FormControl id="useDay" label="Use Day">
              <CheckboxField name="monday" label="Mon" form={form} />
              <CheckboxField name="tuesday" label="Tue" form={form} />
              <CheckboxField name="wednesday" label="Wed" form={form} />
              <CheckboxField name="thursday" label="Thu" form={form} />
              <CheckboxField name="friday" label="Fri" form={form} />
              <CheckboxField name="saturday" label="Sat" form={form} />
              <CheckboxField name="sunday" label="Sun" form={form} />
            </FormControl>
            <FormControl id="useDate" label="Use Date">
              <InputField name="useDate" placeholder="8/19" form={form} />
            </FormControl>
            <FormControl id="useTime" label="Use Time">
              <InputField name="useTimeStart" placeholder="10:00" form={form} /> -{' '}
              <InputField name="useTimeEnd" placeholder="12:00" form={form} />
            </FormControl>
          </Box>

          <Box></Box>
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

const SwrapSelectIssuance = styled(Box)`
  display: flex;
  align-items: center;
  & > * {
    margin-right: 10px !important;
    max-width: ${fieldWidth}px;
  }
`;
const SWrapButton = styled(SwrapSelectIssuance)`
  justify-content: flex-end;
`;
export default SSRPage;
