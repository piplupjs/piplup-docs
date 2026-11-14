'use client';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { MuiXYearCalendarElement } from '@piplup/rhf-adapters/mui-x-date-pickers';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

export default function Page() {
  const { control, handleSubmit } = useForm({
    defaultValues: { year: dayjs() },
  });
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))}>
        <MuiXYearCalendarElement control={control} name="year" />
        <MuiButtonElement control={control} sx={{ mt: 2 }} type="submit" variant="contained">
          Submit
        </MuiButtonElement>
      </form>
    </LocalizationProvider>
  );
}
