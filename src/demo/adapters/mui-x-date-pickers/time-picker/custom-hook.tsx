'use client';

import Stack from '@mui/material/Stack';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { useMuiXTimePickerAdapter } from '@piplup/rhf-adapters/mui-x-date-pickers';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

import type { Dayjs } from 'dayjs';
import type { Control } from 'react-hook-form';

type FormValues = { shiftStart: Dayjs | null };

// Only the time of day is compared, so the date part of these values does not matter.
const opensAt = dayjs().hour(8).minute(0);
const closesAt = dayjs().hour(18).minute(0);

// Shifts start between 08:00 and 18:00, on the quarter hour.
function ShiftStartField({ control }: { control: Control<FormValues> }) {
  const adapter = useMuiXTimePickerAdapter<Dayjs, FormValues, 'shiftStart', HTMLDivElement>({
    composeHelperText: true,
    control,
    maxTime: closesAt,
    messages: {
      maxTime: 'The last shift starts at 18:00',
      minTime: 'We open at 08:00',
      minutesStep: 'Use a quarter hour (:00, :15, :30 or :45)',
      required: 'Pick a start time',
    },
    minTime: opensAt,
    minutesStep: 15,
    name: 'shiftStart',
    required: true,
    slotProps: {
      textField: { helperText: '08:00 to 18:00, every 15 minutes' },
    },
  });

  return <TimePicker ampm={false} label="Shift start" {...adapter} />;
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { shiftStart: null },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        onSubmit={handleSubmit((values) => alert(values.shiftStart?.format('HH:mm')))}
        noValidate
      >
        <Stack direction="column" spacing={2}>
          <ShiftStartField control={control} />
          <div>
            <MuiButtonElement control={control} type="submit" variant="contained">
              Save shift
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
