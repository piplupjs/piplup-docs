'use client';

import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import { DigitalClock, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { useMuiXDigitalClockAdapter } from '@piplup/rhf-adapters/mui-x-date-pickers';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

import type { Dayjs } from 'dayjs';
import type { Control } from 'react-hook-form';

type FormValues = { slot: Dayjs | null };

const bookedSlots = ['10:00', '13:30', '15:00'];

// DigitalClock lists one option per `timeStep` and checks each option with
// `shouldDisableTime(option, "hours")`, so the booked check runs for the "hours" view.
function SlotPicker({ control }: { control: Control<FormValues> }) {
  const { error, helperText, required, ...adapter } = useMuiXDigitalClockAdapter<
    Dayjs,
    FormValues,
    'slot',
    HTMLDivElement
  >({
    composeHelperText: true,
    control,
    maxTime: dayjs().hour(16).minute(30),
    messages: {
      required: 'Pick a free slot',
      'shouldDisableTime-hours': 'That slot is already booked',
    },
    minTime: dayjs().hour(9).minute(0),
    name: 'slot',
    required: true,
    shouldDisableTime: (value, view) =>
      view === 'hours' && bookedSlots.includes(value.format('HH:mm')),
  });

  return (
    <div>
      <DigitalClock ampm={false} timeStep={30} skipDisabled {...adapter} />
      <FormHelperText error={error}>
        {helperText || '30-minute slots, 09:00 to 16:30'}
      </FormHelperText>
    </div>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { slot: null },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit((values) => alert(values.slot?.format('HH:mm')))} noValidate>
        <Stack direction="column" spacing={2}>
          <SlotPicker control={control} />
          <div>
            <MuiButtonElement control={control} type="submit" variant="contained">
              Book slot
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
