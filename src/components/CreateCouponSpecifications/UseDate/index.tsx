import { Chip, TextField } from '@mui/material';
import { Key, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
type Props = {
  form: any;
  name: string;
  label: string;
  disabled?: boolean;
  key?: Key;
};

const UseDate = (props: Props) => {
  const { form, name, label, disabled = false, key } = props;
  const [dates, setDates] = useState<string[]>([]);
  const handleChange = (event: any) => {
    const date = event.format('MM/DD');
    const data = [...dates, date] as string[];
    setDates(data);
  };
  const handleDelete = (data: string) => {
    console.log('data', data);

    const filterData = dates.filter((item) => item !== data);
    setDates(filterData);
  };
  useEffect(() => {
    form.setValue('useDate', JSON.stringify(dates));
  }, [dates]);
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Controller
          name={name}
          control={form.control}
          render={({ field: { onChange, value, ...rest } }) => (
            <DesktopDatePicker
              label={label}
              inputFormat="MM/DD/YYYY"
              value={value}
              onChange={(event) => {
                onChange(event);
                handleChange(event);
              }}
              {...rest}
              renderInput={(params) => {
                return <TextField {...params} size="small" />;
              }}
            />
          )}
        />
      </LocalizationProvider>
      {!!dates &&
        dates.length > 0 &&
        dates.map((item) => <Chip key={item} label={item} onDelete={() => handleDelete(item)} />)}
    </>
  );
};

export default UseDate;
