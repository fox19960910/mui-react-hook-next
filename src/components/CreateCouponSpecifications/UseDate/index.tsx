import { Chip, TextField, Button } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Key, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import styled from '@emotion/styled';
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
  const [isOpen, setIsOpen] = useState(false);
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
    <SWrapContainer>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Controller
          name={name}
          control={form.control}
          render={({ field: { onChange, value, ...rest } }) => (
            <DesktopDatePicker
              open={isOpen}
              label={label}
              inputFormat="MM/DD/YYYY"
              value={value}
              onChange={(event) => {
                onChange(event);
                handleChange(event);
              }}
              {...rest}
              renderInput={(params) => {
                return (
                  <SWrapper>
                    <TextField {...params} size="small" style={{ visibility: 'hidden' }} />
                    <SButton
                      variant="outlined"
                      color="primary"
                      onClick={() => setIsOpen((isOpen) => !isOpen)}
                      startIcon={<CalendarTodayIcon />}
                    >
                      {'12/05/2020'}
                    </SButton>
                  </SWrapper>
                );
              }}
            />
          )}
        />
      </LocalizationProvider>
      {!!dates && dates.length > 0 && (
        <SWrapChip>
          {dates.map((item) => (
            <Chip key={item} label={item} onDelete={() => handleDelete(item)} />
          ))}
        </SWrapChip>
      )}
    </SWrapContainer>
  );
};

const SWrapper = styled.div`
  position: relative;
  width: 150px;
`;
const SButton = styled(Button)`
  position: absolute;
  left: 0;
  bottom: 0;
`;
const SWrapContainer = styled.div`
  display: flex;
  align-items: center;
`;
const SWrapChip = styled.div`
  flex: 1;
  & > .MuiChip-root {
    margin: 0 5px;
  }
`;
export default UseDate;
