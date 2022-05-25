import React from 'react';
import Color from 'color';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

type Props = {
  title: string;
  values: any[];
  isLast: boolean;
  handleChange: (e: any) => void; //_.debounce(handleChange(key), 1000)\
}

const disableColorSettingAry = ['primaryChannel', 'secondaryChannel', 'darkChannel', 'activeChannel'];

const SettingItem = ({ title, values, isLast, handleChange }: Props) => {
  return (
    <Box sx={{ flexBasis: '48%', mb: 1, }}>
      <Typography
        component="h5"
        sx={{ mb: 2, color: 'text.primary' }}
      >
        {title}
      </Typography>
      <Box
        className="custom-scroll-bar"
        sx={[
          {
            maxHeight: '250px',
            overflowY: 'scroll',
            overflowX: 'hidden',
            p: 2
          },
          isLast && {
            flexBasis: '100%',
            mb: 3
          }
        ]}
      >
        <Box sx={{ ml: 1 }}>
          {Object.keys(values).map(valueKey => {
            if (disableColorSettingAry.indexOf(valueKey) > -1) return;
            const inputType = typeof values[valueKey] === 'string' ? 'color' : 'number';
            const inputValue = inputType === 'color' ? Color(values[valueKey]).hex() : values[valueKey];
            const numberProps = inputType === 'color' ? {} : { min: " 0", max: "1", step: "0.1" };

            return (
              <TextField
                key={valueKey}
                type={inputType}
                label={<Typography component='span' sx={{ mr: 2, color: 'text.primary' }}>{valueKey}</Typography>}
                name={valueKey}
                defaultValue={inputValue}
                variant="outlined"
                sx={{ mb: 3, mr: 1, width: '100%' }}
                onChange={handleChange}
                {...numberProps}
              />
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}

export default SettingItem;