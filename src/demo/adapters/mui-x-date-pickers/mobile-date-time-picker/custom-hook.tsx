'use client';

import * as React from 'react';

import Stack from '@mui/material/Stack';
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { useMuiXMobileDateTimePickerAdapter } from '@piplup/rhf-adapters/mui-x-date-pickers';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

import type { Dayjs } from 'dayjs';
import type { Control } from 'react-hook-form';

type FormValues = { pickup: Dayjs | null };

// Orders need two hours to prepare. `disableIgnoringDatePartForTimeValidation`
// makes the hook compare `minTime` against the full date and time, so it works as
// a "not before this moment" rule instead of a daily opening time. `disablePast`
// makes the picker do the same, so the views grey out the right times.
function PickupField({ control }: { control: Control<FormValues> }) {
  const [earliest] = React.useState(() => dayjs().add(2, 'hour').startOf('minute'));

  const adapter = useMuiXMobileDateTimePickerAdapter<Dayjs, FormValues, 'pickup', HTMLDivElement>({
    composeHelperText: true,
    control,
    disableIgnoringDatePartForTimeValidation: true,
    disablePast: true,
    maxDate: earliest.add(30, 'day'),
    messages: {
      maxDate: 'Orders can be placed up to 30 days ahead',
      minDate: `Pickup can't be before ${earliest.format('ddd D MMM')}`,
      minTime: `The earliest pickup is ${earliest.format('ddd HH:mm')}`,
      minutesStep: 'Pickups are every half hour',
      required: 'Choose a pickup time',
    },
    minDate: earliest,
    minTime: earliest,
    minutesStep: 30,
    name: 'pickup',
    required: true,
    slotProps: {
      textField: { helperText: 'Tap to open the picker' },
    },
  });

  return <MobileDateTimePicker ampm={false} label="Pickup" {...adapter} />;
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { pickup: null },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        onSubmit={handleSubmit((values) => alert(values.pickup?.format('ddd D MMM, HH:mm')))}
        noValidate
      >
        <Stack direction="column" spacing={2}>
          <PickupField control={control} />
          <div>
            <MuiButtonElement control={control} type="submit" variant="contained">
              Place order
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
