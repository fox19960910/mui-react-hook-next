import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

type Props = {
  form: any;
  name: string;
  disabled?: boolean;
  data: string[];
};

const SelectDropdown = (props: Props) => {
  const { form, name, disabled = false, data = [] } = props;
  const { errors } = form.formState;
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormControl fullWidth>
          {/* <InputLabel id="demo-simple-select-label">{label}</InputLabel> */}
          <Select
            disabled={disabled}
            {...field}
            size="small"
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="">
              <em>Please choose</em>
            </MenuItem>
            {!!data &&
              data.length > 0 &&
              data.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      )}
    />
  );
};

export default SelectDropdown;
