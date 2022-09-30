import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, InputAdornment } from '@mui/material';
import { GetServerSidePropsContext } from 'next';
import { FC } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
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
import Button from '@mui/material/Button';
import CouponIssuanceSubject from '../components/CreateCouponSpecifications/CouponIssuanceSubject';
import LimitNumberUse from '../components/CreateCouponSpecifications/LimitNumberUse';
import MaximumUse from '../components/CreateCouponSpecifications/MaximumUse';

const fieldWidth = 210;

const subjectAll = [
  { value: 'subjectAll', label: 'All' },
  { value: 'subjectFranchise', label: 'Franchise (brand)' },
  { value: 'subjectCategory', label: 'Category' },
  { value: 'subjectRestaurant', label: 'Restaurant' },
  { value: 'subjectYomart', label: 'Yomart' },
];
const oderType = [
  { value: 'express', label: 'Express (OD)' },
  { value: 'delivery', label: 'Delivery (VD)' },
  { value: 'packing', label: 'Packing' },
  { value: 'preOder', label: 'Pre-order' },
];

// export type TBenefitSelect = {
//   typeBenefit: string;
//   benefitValue: number;
//   maxDiscount: number;
// };
// export type TCPIssuanceSubject = {
//   issuanceParent: string;
//   issuanceChild: string;
//   issuancePercent: number;
// };
// export type TLimitUse = {
//   isLimitUserActive: boolean;
//   limitUseValue: number;
// };
// export type TMaximumUse = {
//   isMaximumUse: boolean;
//   maximumUseValue: number;
// };
// export type FormInputs = {
//   name: string;
//   issuance: TCPIssuanceSubject;
//   couponBenefits: TBenefitSelect;
//   paymentAcount: number;
//   limitUse: TLimitUse;
//   maximumUse: TMaximumUse;
//   subjectsApply: string;
//   oderType: string;
//   yogiPass : boolean
// };

const schema = z.object({
  name: z.string().trim().min(1).max(20),
  issuance: z.object({
    issuanceParent: z.string().trim().min(1),
    issuanceChild: z.string().trim().min(1),
    issuancePercent: z.number().positive(),
  }),
  paymentAcount: z.number().positive(),
  couponBenefits: z.object({
    typeBenefit: z.string().trim().min(1),
    benefitValue: z.number().positive(),
    maxDiscount: z.number().positive(),
  }),
  limitUse: z.object({
    isLimitUserActive: z.boolean(),
    limitUseValue: z.number().positive(),
  }),
  maximumUse: z.object({
    isMaximumUse: z.boolean(),
    maximumUseValue: z.number().positive(),
  }),
  subjectsApply: z.string(),
  oderType: z.string(),
  yogiPass: z.boolean(),
  useChanel: z.boolean(),
  useCityRegion: z.boolean(),
  // useDay: z.array(z.string()),
});

export type Schema = z.infer<typeof schema>;

const SSRPage: FC = () => {
  const form = useForm<Schema>({
    defaultValues: {
      name: '',
      issuance: {
        issuanceParent: '',
        issuanceChild: '',
        issuancePercent: 0,
      },
      couponBenefits: {
        typeBenefit: '',
        benefitValue: 0,
        maxDiscount: 0,
      },
      paymentAcount: 0,
      limitUse: {
        isLimitUserActive: false,
        limitUseValue: 0,
      },
      maximumUse: {
        isMaximumUse: false,
        maximumUseValue: 0,
      },
      subjectsApply: '',
      oderType: '',
      yogiPass: false,
      useChanel: false,
      useCityRegion: false,
    },
    resolver: zodResolver(schema),
  });

  const handleSubmit: SubmitHandler<Schema> = (values: Schema) => {
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
              <CouponIssuanceSubject form={form} />
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
                <SelectDropdown name="couponBenefits.typeBenefit" form={form} data={['1', '2', '3']} />
                <InputField name="couponBenefits.benefitValue" placeholder="0 %" form={form} type="number" />
                <InputField
                  name="couponBenefits.maxDiscount"
                  placeholder="Maximum discount"
                  form={form}
                  type="number"
                />
              </SwrapSelectIssuance>
            </FormControl>
            <FormControl id="paymentAcount" label="Minimum payment amount">
              <InputField
                name="paymentAcount"
                placeholder="Please enter"
                form={form}
                type="number"
                inputProps={{ endAdornment: <InputAdornment position="end">won</InputAdornment> }}
              />
            </FormControl>
            <FormControl id="limitUse" label="Limit number of uses">
              <LimitNumberUse form={form} />
            </FormControl>
            <FormControl id="maximumUse" label="Maximum number of uses">
              <MaximumUse form={form} />
            </FormControl>
          </Box>

          <Box>
            <HeadSubTitle>Subjects to apply coupons</HeadSubTitle>
            <FormControl id="subjectsApply" label="Subjects to apply coupons">
              <RadioField name="subjectsApply" label="subjectsApply" form={form} data={subjectAll} />
            </FormControl>
          </Box>

          <Box>
            <HeadSubTitle>Conditions for using coupons</HeadSubTitle>
            <FormControl id="oderType" label="Order type">
              <RadioField name="oderType" label="Order type" form={form} data={oderType} />
            </FormControl>
            <FormControl id="yogiPass" label="Yogi Pass">
              <CheckboxField name="yogiPass" label="Available for copy during Yogi Pass" form={form} />
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

          <SWrapButton>
            <Button variant="contained" type="submit">
              Save
            </Button>
            <Button variant="outlined">Cancel</Button>
          </SWrapButton>
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
