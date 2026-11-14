'use client';

import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { MuiXDatePickerElement } from '@piplup/rhf-adapters/mui-x-date-pickers';
import { useForm, useWatch } from 'react-hook-form';

import type { Dayjs } from 'dayjs';

type Booking = { checkIn: Dayjs | null; checkOut: Dayjs | null };

export default function Page() {
  const { control, handleSubmit } = useForm<Booking>({
    defaultValues: { checkIn: null, checkOut: null },
  });
  const checkIn = useWatch({ control, name: 'checkIn' });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        onSubmit={handleSubmit((values) =>
          alert(
            JSON.stringify(
              {
                checkIn: values.checkIn?.format('YYYY-MM-DD'),
                checkOut: values.checkOut?.format('YYYY-MM-DD'),
              },
              null,
              2,
            ),
          ),
        )}
        noValidate
      >
        <Stack direction="column" spacing={2}>
          <MuiXDatePickerElement
            messages={{
              disablePast: "Check-in can't be in the past",
              required: 'Pick a check-in date',
            }}
            control={control}
            label="Check-in"
            name="checkIn"
            rules={{ deps: 'checkOut' }}
            disablePast
            required
          />
          <MuiXDatePickerElement
            messages={{
              minDate: 'Check-out must be after check-in',
              required: 'Pick a check-out date',
            }}
            control={control}
            label="Check-out"
            minDate={checkIn ? checkIn.add(1, 'day') : undefined}
            name="checkOut"
            required
          />
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
