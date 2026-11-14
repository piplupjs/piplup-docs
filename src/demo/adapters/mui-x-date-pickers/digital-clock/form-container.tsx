'use client';

import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { MuiXDigitalClockElement } from '@piplup/rhf-adapters/mui-x-date-pickers';
import { FormContainer } from '@piplup/rhf-core';
import dayjs from 'dayjs';

export default function Page() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormContainer
        defaultValues={{ digital: dayjs() }}
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
      >
        <Stack direction="column" spacing={2}>
          <MuiXDigitalClockElement name="digital" />
          <div>
            <MuiButtonElement type="submit" variant="contained">
              Submit
            </MuiButtonElement>
          </div>
        </Stack>
      </FormContainer>
    </LocalizationProvider>
  );
}
