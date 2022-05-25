import React, { useState } from 'react';
import _ from 'lodash';
import { useTheme, Palette } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SettingItem from './SettingItem/SettingItem';
import TestComponent from 'container/Test/Test';
import { useAuthCtx } from 'hooks/useAuth';

const System = () => {
  const theme = useTheme();
  const { action: authAction } = useAuthCtx();
  const [palette, setPalette] = useState<Palette>(theme.palette);
  const [isShowResult, setIsShowResult] = useState<boolean>(false);
  const entries = Object.entries(palette);
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
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', background: '#000', p: 2, flex: 1 }}>
        <Typography
          component="h1"
          sx={{ mb: 2, color: 'text.primary', height: 'auto' }}
        >
          Theme Color Settings
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {entries.map(([key, values], index) => {
            if (typeof values !== 'object') return;

            return (
              <SettingItem
                key={key}
                title={key}
                values={values}
                isLast={index === entries.length - 1}
                handleChange={_.debounce(handleChange(key), 1000)}
              />
            )
          })}
        </Box>
        <Button
          variant="contained"
          size="large"
          sx={{ width: '60%', mx: 'auto' }}
          onClick={handleApply}
        >
          Apply
        </Button>
      </Box>
      <TestComponent />
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 5 }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => setIsShowResult(!isShowResult)}
          sx={{ minWidth: 'auto' }}
        >
          {isShowResult ? 'Close' : 'Result'}
        </Button>
      </Box>
      <Modal
        open={isShowResult}
        onClose={() => setIsShowResult(!isShowResult)}
      >
        <Box
          className='custom-scroll-bar'
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '300px',
            maxHeight: '300px',
            overflowY: 'scroll',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            wordBreak: "break-all",
            color: 'text.secondary'
          }}>
          {JSON.stringify(palette)}
        </Box>
      </Modal>
    </>
  )
}

export default System;