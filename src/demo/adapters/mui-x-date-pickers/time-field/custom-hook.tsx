'use client';

import Stack from '@mui/material/Stack';
import { LocalizationProvider, TimeField } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { useMuiXTimeFieldAdapter } from '@piplup/rhf-adapters/mui-x-date-pickers';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

import type { Dayjs } from 'dayjs';
import type { Control } from 'react-hook-form';

type FormValues = { checkIn: Dayjs | null };

// A typed-only time input. TimeField is a text field, so `error`, `helperText`
// and `onBlur` from the adapter go straight onto it.
function CheckInField({ control }: { control: Control<FormValues> }) {
  const adapter = useMuiXTimeFieldAdapter<Dayjs, FormValues, 'checkIn', HTMLDivElement>({
    composeHelperText: true,
    control,
    helperText: 'Between 14:00 and 23:00',
    maxTime: dayjs().hour(23).minute(0),
    messages: {
      maxTime: 'Reception closes at 23:00',
      minTime: 'Check-in opens at 14:00',
      required: 'Enter your arrival time',
    },
    minTime: dayjs().hour(14).minute(0),
    name: 'checkIn',
    required: true,
  });

  return <TimeField format="HH:mm" label="Arrival time" {...adapter} />;
}

export default function Page() {
  // mode "onBlur": the field validates as soon as you tab out of it.
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { checkIn: null },
    mode: 'onBlur',
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit((values) => alert(values.checkIn?.format('HH:mm')))} noValidate>
        <Stack direction="column" spacing={2}>
          <CheckInField control={control} />
          <div>
            <MuiButtonElement control={control} type="submit" variant="contained">
              Save arrival
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
