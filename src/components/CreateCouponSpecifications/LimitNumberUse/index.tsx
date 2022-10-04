import styled from '@emotion/styled';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { Schema } from '../../../pages/create-coupon-specifications';
import InputField from '../../formControl/InputField';
import SelectDropdown from '../../formControl/SelectDropdown';
import SwitchField from '../../formControl/SwitchField';

type Props = {
  form: UseFormReturn<Schema>;
};

const LimitNumberUse = ({ form }: Props) => {
  const { control } = form;
  const isActive = useWatch({
    control,
    name: 'limitUse.isLimitUserActive',
    defaultValue: false,
  });

  useEffect(() => {
    if (!isActive) form.setValue('limitUse.limitUseValue', 0);
  }, [isActive, form]);
  return (
    <>
      <SwitchField label="Per memberId" form={form} name="limitUse.isLimitUserActive" />
      <InputField
        name="limitUse.limitUseValue"
        placeholder="Can be used "
        form={form}
        disabled={!isActive}
        type="number"
      />
    </>
  );
};

export default LimitNumberUse;
