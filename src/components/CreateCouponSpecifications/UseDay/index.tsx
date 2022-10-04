import { useEffect } from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { Schema } from '../../../pages/create-coupon-specifications';
import { CheckboxField } from '../../formControl';
import SwitchField from '../../formControl/SwitchField';

type Tday = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
const days: Tday[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

type Props = {
  form: UseFormReturn<Schema>;
};

const UseDay = ({ form }: Props) => {
  const { control } = form;
  const isActive = useWatch({
    control,
    name: 'useDay.isUseDayActive',
    defaultValue: false,
  });

  useEffect(() => {
    days.forEach((item: Tday) => form.setValue(`useDay.${item}`, isActive));
  }, [isActive, form]);
  return (
    <>
      <SwitchField label="Max Person" form={form} name="useDay.isUseDayActive" />
      {days.map((item, index) => (
        <span key={index}>
          <CheckboxField name={`useDay.${item}`} label={item} form={form} />
        </span>
      ))}
    </>
  );
};

export default UseDay;
