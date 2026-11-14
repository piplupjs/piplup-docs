'use client';

import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import { LocalizationProvider, TimeClock } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { useMuiXTimeClockAdapter } from '@piplup/rhf-adapters/mui-x-date-pickers';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

import type { Dayjs } from 'dayjs';
import type { Control } from 'react-hook-form';

type FormValues = { wakeUp: Dayjs | null };

const earliest = dayjs().hour(6).minute(0);

// TimeClock has no text field and no `error` or `helperText` props, so they are
// pulled out of the adapter and rendered below the clock instead.
function WakeUpClock({ control }: { control: Control<FormValues> }) {
  const { error, helperText, required, ...adapter } = useMuiXTimeClockAdapter<
    Dayjs,
    FormValues,
    'wakeUp',
    HTMLDivElement
  >({
    composeHelperText: true,
    control,
    messages: {
      minTime: "Alarms can't be set before 06:00",
      required: 'Set a wake-up time',
    },
    minTime: earliest,
    name: 'wakeUp',
    required: true,
  });

  return (
    <div>
      <TimeClock ampm={false} views={['hours', 'minutes']} {...adapter} />
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </div>
  );
}

export default function Page() {
  // The saved value (05:30) is earlier than `minTime`. The clock disables those
  // hours, but submitting still reports the stored value as invalid.
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { wakeUp: dayjs().hour(5).minute(30) },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit((values) => alert(values.wakeUp?.format('HH:mm')))} noValidate>
        <Stack direction="column" spacing={2}>
          <WakeUpClock control={control} />
          <div>
            <MuiButtonElement control={control} type="submit" variant="contained">
              Set alarm
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
