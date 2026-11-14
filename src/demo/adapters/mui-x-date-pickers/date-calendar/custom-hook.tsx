'use client';

import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { useMuiXDateCalendarAdapter } from '@piplup/rhf-adapters/mui-x-date-pickers';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

import type { Dayjs } from 'dayjs';
import type { Control } from 'react-hook-form';

type FormValues = { delivery: Dayjs | null };

// DateCalendar has no text field, so this component renders the error itself.
function DeliveryCalendar({ control }: { control: Control<FormValues> }) {
  const { error, helperText, required, ...adapter } = useMuiXDateCalendarAdapter<
    Dayjs,
    FormValues,
    'delivery',
    HTMLDivElement
  >({
    composeHelperText: true,
    control,
    disablePast: true,
    helperText: 'We deliver Monday to Saturday.',
    maxDate: dayjs().add(30, 'day'),
    messages: {
      disablePast: 'That day has passed. Pick a new one.',
      maxDate: 'We only schedule 30 days ahead',
      required: 'Choose a delivery day',
      shouldDisableDate: "We don't deliver on Sundays",
    },
    name: 'delivery',
    required: true,
    shouldDisableDate: (date) => date.day() === 0,
  });

  return (
    <div>
      <DateCalendar {...adapter} />
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </div>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    // A saved draft from yesterday: the calendar shows it, validation rejects it.
    defaultValues: { delivery: dayjs().subtract(1, 'day') },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        onSubmit={handleSubmit((values) => alert(values.delivery?.format('dddd, D MMMM YYYY')))}
        noValidate
      >
        <Stack direction="column" spacing={2}>
          <DeliveryCalendar control={control} />
          <div>
            <MuiButtonElement control={control} type="submit" variant="contained">
              Schedule delivery
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
