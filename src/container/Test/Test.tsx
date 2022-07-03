import React from 'react';
// import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Texts from './component/Texts'

const Test = () => {
  // const theme = useTheme();
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const Title = ({ content }) => (
    <Typography component='h1' sx={{ height: 'auto', color: 'text.primary', textAlign: 'center', fontWeight: 'bold', mb: 3 }}>
      {content}
    </Typography>
  )

  return (
    <Box sx={{ backgroundColor: 'background.default', py: 1 }}>
      <Typography component='h1' sx={{ my: 3, height: 'auto', color: 'text.primary' }}>
        Preview
      </Typography>
      <Divider
        light
        sx={{ width: '75%', mb: 3, mx: 'auto', borderWidth: '2px' }}
      />
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <Box sx={{ width: '100%' }}>
          <Title content='按鈕' />
          <Button variant="contained" sx={{ width: '100%', mb: 2 }}>按鈕一</Button>
          <Button variant="outlined" sx={{ width: '100%', mb: 2 }}>按鈕二</Button>
          <Button variant="text" sx={{ width: '100%' }}>按鈕三</Button>
        </Box>
        <Divider sx={{ width: '100%', my: 3 }} />
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Title content='輸入框' />
          <Box>
            <TextField
              type="text"
              variant="filled"
              color="primary"
              placeholder="測試輸入框 primary"
              sx={{ mb: 3, width: '80%' }}
            />
          </Box>
          <Box>
            <TextField
              type="textArea"
              variant="outlined"
              color="secondary"
              multiline
              placeholder="測試多行輸入框 secondary"
              sx={{ mb: 3, width: '80%' }}
            />
          </Box>
          <Box>
            <FormControl sx={{ m: 1, minWidth: 120 }} disabled>
              <InputLabel id="demo-simple-select-disabled-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-disabled-label"
                id="demo-simple-select-disabled"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <FormHelperText>Disabled</FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} error>
              <InputLabel id="demo-simple-select-error-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-error-label"
                id="demo-simple-select-error"
                value={age}
                label="Age"
                onChange={handleChange}
                renderValue={(value) => `⚠️  - ${value}`}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <FormHelperText>Error</FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-readonly-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-readonly-label"
                id="demo-simple-select-readonly"
                value={age}
                label="Age"
                onChange={handleChange}
                inputProps={{ readOnly: true }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <FormHelperText>Read only</FormHelperText>
            </FormControl>
            <FormControl required sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-required-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={age}
                label="Age *"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
          </Box>
        </Box>
        <Divider sx={{ width: '100%', my: 3 }} />
        <Box sx={{ width: '100%' }}>
          <Title content='文字' />
          <Texts
            texts={[
              { type: 'h1', color: 'text.primary' },
              { type: 'p', color: 'text.secondary' },
              { type: 'span', color: 'text.disabled' },
              { type: 'p', color: 'text.icon' },
              { type: 'p', color: 'primary.main' },
              { type: 'p', color: 'primary.dark' },
              { type: 'p', color: 'primary.light' },
              { type: 'blank' },
              { type: 'p', color: 'secondary.main' },
              { type: 'p', color: 'secondary.dark' },
              { type: 'p', color: 'secondary.light' },
              { type: 'blank' },
              { type: 'p', color: 'success.main' },
              { type: 'p', color: 'success.dark' },
              { type: 'p', color: 'success.light' },
              { type: 'blank' },
              { type: 'p', color: 'info.main' },
              { type: 'p', color: 'info.dark' },
              { type: 'p', color: 'info.light' },
              { type: 'blank' },
              { type: 'p', color: 'warning.main' },
              { type: 'p', color: 'warning.dark' },
              { type: 'p', color: 'warning.light' },
              { type: 'blank' },
              { type: 'p', color: 'error.main' },
              { type: 'p', color: 'error.dark' },
              { type: 'p', color: 'error.light' },
            ]}
          />
        </Box>
      </Box>
    </Box >
  )
}

export default Test