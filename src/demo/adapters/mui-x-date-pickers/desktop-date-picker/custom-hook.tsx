'use client';

import Stack from '@mui/material/Stack';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { useMuiXDesktopDatePickerAdapter } from '@piplup/rhf-adapters/mui-x-date-pickers';
import { useForm, useWatch } from 'react-hook-form';

import type { Dayjs } from 'dayjs';
import type { Control } from 'react-hook-form';

type FormValues = { checkIn: Dayjs | null; checkOut: Dayjs | null };

function CheckInField({ control }: { control: Control<FormValues> }) {
  const adapter = useMuiXDesktopDatePickerAdapter<Dayjs, FormValues, 'checkIn', HTMLDivElement>({
    composeHelperText: true,
    control,
    disablePast: true,
    messages: {
      disablePast: "Check-in can't be in the past",
      required: 'Choose a check-in date',
    },
    name: 'checkIn',
    required: true,
  });

  return <DesktopDatePicker label="Check-in" {...adapter} />;
}

function CheckOutField({ control }: { control: Control<FormValues> }) {
  const checkIn = useWatch({ control, name: 'checkIn' });

  const adapter = useMuiXDesktopDatePickerAdapter<Dayjs, FormValues, 'checkOut', HTMLDivElement>({
    composeHelperText: true,
    control,
    maxDate: checkIn?.add(14, 'day'),
    messages: {
      maxDate: 'Stays are limited to 14 nights',
      minDate: 'Check-out must be after check-in',
      required: 'Choose a check-out date',
    },
    // At least one night, at most 14. The limits follow the current check-in value
    // because the rules are rebuilt on every render.
    minDate: checkIn?.add(1, 'day'),
    name: 'checkOut',
    required: true,
  });

  return <DesktopDatePicker label="Check-out" {...adapter} />;
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { checkIn: null, checkOut: null },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        onSubmit={handleSubmit(({ checkIn, checkOut }) =>
          alert(`${checkOut?.diff(checkIn, 'day')} nights`),
        )}
        noValidate
      >
        <Stack direction="column" spacing={2}>
          <Stack direction={{ sm: 'row', xs: 'column' }} spacing={2}>
            <CheckInField control={control} />
            <CheckOutField control={control} />
          </Stack>
          <div>
            <MuiButtonElement control={control} type="submit" variant="contained">
              Check availability
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
