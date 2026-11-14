'use client';

import Stack from '@mui/material/Stack';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { useMuiXDatePickerAdapter } from '@piplup/rhf-adapters/mui-x-date-pickers';
import { useForm } from 'react-hook-form';

import type { Dayjs } from 'dayjs';
import type { Control } from 'react-hook-form';

type FormValues = { appointment: Dayjs | null };

// A reusable field with project-wide defaults baked in: weekdays only,
// no past dates, and custom validation messages.
function AppointmentField({ control }: { control: Control<FormValues> }) {
  const adapter = useMuiXDatePickerAdapter<Dayjs, FormValues, 'appointment', HTMLDivElement>({
    composeHelperText: true,
    control,
    disablePast: true,
    messages: {
      disablePast: "Appointments can't be in the past",
      required: 'Pick a date for your appointment',
      shouldDisableDate: "We're closed on weekends",
    },
    name: 'appointment',
    required: true,
    shouldDisableDate: (date) => date.day() === 0 || date.day() === 6,
    slotProps: {
      textField: { helperText: 'Weekdays only' },
    },
  });

  return <DatePicker label="Appointment" {...adapter} />;
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { appointment: null },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        onSubmit={handleSubmit((values) => alert(values.appointment?.format('dddd, D MMMM YYYY')))}
        noValidate
      >
        <Stack direction="column" spacing={2}>
          <AppointmentField control={control} />
          <div>
            <MuiButtonElement control={control} type="submit" variant="contained">
              Book
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
