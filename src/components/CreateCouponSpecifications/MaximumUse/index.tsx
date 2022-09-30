import { UseFormReturn, useWatch } from 'react-hook-form';
import { Schema } from '../../../pages/create-coupon-specifications';
import InputField from '../../formControl/InputField';
import SwitchField from '../../formControl/SwitchField';

type Props = {
  form: UseFormReturn<Schema>;
};

const MaximumUse = ({ form }: Props) => {
  const { control } = form;
  const isActive = useWatch({
    control,
    name: 'maximumUse.isMaximumUse',
    defaultValue: false,
  });

  return (
    <>
      <SwitchField label="Max Person" form={form} name="maximumUse.isMaximumUse" />
      <InputField
        name="maximumUse.maximumUseValue"
        placeholder="Can be used "
        form={form}
        type="number"
        disabled={!isActive}
      />
    </>
  );
};

export default MaximumUse;
