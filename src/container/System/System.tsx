import React, { useState } from 'react';
import Color from 'color';
import { useTheme, Palette } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAuthCtx } from 'hooks/useAuth';

const System = () => {
  const theme = useTheme();
  const { action: authAction } = useAuthCtx();
  const [palette, setPalette] = useState<Palette>(theme.palette);
  const entries = Object.entries(palette);
  const disableColorSettingAry = ['primaryChannel', 'secondaryChannel', 'darkChannel'];
  const handleChange = (e, mainKey, valueKey) => {
    e.preventDefault();
    const value = e?.target?.value || palette[mainKey][valueKey];

    setPalette(prev => ({
      ...prev,
      [mainKey]: {
        ...prev[mainKey],
        [valueKey]: value
      }
    }));
  }
  const handleApply = (e) => {
    e.preventDefault();
    authAction.changeTheme({ ...theme, palette });
  }
  const throttle = (func, timeout = 250) => {
    let last;
    let timer;

    return function () {
      const context = this;
      const args = arguments;
      const now = +new Date();

      if (last && now < last + timeout) {
        clearTimeout(timer)
        timer = setTimeout(function () {
          last = now
          func.apply(context, args)
        }, timeout)
      } else {
        last = now
        func.apply(context, args)
      }
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Typography
        component="h1"
        sx={{ mb: 2, color: 'primary.main', height: 'auto' }}
      >
        Theme Color Settings
      </Typography>
      {/* <Box></Box> */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>

        {entries.map(([key, value], index) => {
          if (typeof value !== 'object') return;

          return (
            <Box
              key={key}
              sx={[
                {
                  mb: 3,
                  flexBasis: '48%',
                  maxHeight: '300px',
                  overflowY: 'scroll',
                  border: '1px solid #000',
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
                  if (disableColorSettingAry.indexOf(valueKey) !== -1) return;
                  const inputType = typeof value[valueKey] === 'string' ? 'color' : 'text';
                  const inputValue = inputType === 'color' ? Color(value[valueKey]).hex() : value[valueKey];

                  return (
                    <Box key={valueKey} sx={{ mb: 1 }}>
                      <Box component='span' sx={{ mr: 2 }}>{valueKey}</Box>
                      <input type={inputType} value={inputValue} onChange={(e) => throttle(handleChange(e, key, valueKey), 3000)} />
                    </Box>
                  )
                })}
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