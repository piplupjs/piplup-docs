'use client';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { MuiXDateCalendarElement } from '@piplup/rhf-adapters/mui-x-date-pickers';
import { FormContainer } from '@piplup/rhf-core';
import dayjs from 'dayjs';

export default function Page() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormContainer
        defaultValues={{ date: dayjs() }}
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
      >
        <MuiXDateCalendarElement name="date" />
        <MuiButtonElement sx={{ mt: 2 }} type="submit" variant="contained">
          Submit
        </MuiButtonElement>
      </FormContainer>
    </LocalizationProvider>
  );
}
