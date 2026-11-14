'use client';

import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { MuiXDesktopDateTimePickerElement } from '@piplup/rhf-adapters/mui-x-date-pickers';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

export default function Page() {
  const { control, handleSubmit } = useForm({
    defaultValues: { startDatetime: dayjs() },
  });
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))}>
        <Stack direction="column" spacing={2}>
          <MuiXDesktopDateTimePickerElement
            control={control}
            label="Start datetime"
            name="startDatetime"
          />
          <div>
            <MuiButtonElement control={control} type="submit" variant="contained">
              Submit
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
