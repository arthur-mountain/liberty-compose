import React, { useState } from 'react';
import Color from 'color';
import _ from 'lodash'
import { useTheme, Palette } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useAuthCtx } from 'hooks/useAuth';

const System = () => {
  const theme = useTheme();
  const { action: authAction } = useAuthCtx();
  const [palette, setPalette] = useState<Palette>(theme.palette);
  const entries = Object.entries(palette);
  const disableColorSettingAry = ['primaryChannel', 'secondaryChannel', 'darkChannel', 'activeChannel'];
  const transChangeVal = (value: string) => {
    return value.startsWith('#') ? value : +value;
  }

  const handleChange = (key) => {
    return (e,) => {
      const name = e?.target?.name;
      const value = transChangeVal(e?.target?.value) || palette[key][name];

      setPalette(prev => ({
        ...prev,
        [key]: {
          ...prev[key],
          [name]: value
        }
      }));
    }
  }

  const handleApply = (e) => {
    e.preventDefault();
    authAction.changeTheme({ ...theme, palette });
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#999', p: 2 }}>
      <Typography
        component="h1"
        sx={{ mb: 2, color: 'primary.main', height: 'auto' }}
      >
        Theme Color Settings
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3 }}>
        {entries.map(([key, value], index) => {
          if (typeof value !== 'object') return;

          return (
            <Box
              key={key}
              sx={[
                {
                  mb: 1,
                  p: 1,
                  border: '1px solid #000',
                  // border:2%, p:2%, so this value is 46%
                  flexBasis: '46%',
                },
                entries.length - 1 === index && {
                  flexBasis: '100%',
                }
              ]}
            >
              <Typography
                component="h5"
                sx={{ mb: 2, color: 'grey.900' }}
              >
                {key}
              </Typography>
              <Box sx={{ ml: 1 }}>
                {Object.keys(value).map(valueKey => {
                  if (disableColorSettingAry.indexOf(valueKey) > -1) return;
                  const inputType = typeof value[valueKey] === 'string' ? 'color' : 'number';
                  const inputValue = inputType === 'color' ? Color(value[valueKey]).hex() : value[valueKey];
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
                      onChange={_.debounce(handleChange(key), 1000)}
                      {...numberProps}
                    />
                    // <Box key={valueKey} sx={{ mb: 1 }}>
                    //   <Typography component='span' sx={{ mr: 2 }}>{valueKey}</Typography>
                    //   <input
                    //     type={inputType}
                    //     name={valueKey}
                    //     defaultValue={inputValue}
                    //     onChange={_.debounce(handleChange(key), 1000)}
                    //     {...textProps}
                    //   />
                    // </Box>
                  )
                })}
                {/* TODO: Add new custom theme name and value? */}
                {/* <Button
                  variant="contained"
                  size="small"
                  sx={{ p: 1 }}
                >
                  Add
                </Button> */}
              </Box>
            </Box>
          )
        })}
      </Box>
      <Button
        variant="contained"
        size="large"
        sx={{ width: '45%' }}
        onClick={handleApply}
      >
        Apply
      </Button>
    </Box>
  )
}

export default System;