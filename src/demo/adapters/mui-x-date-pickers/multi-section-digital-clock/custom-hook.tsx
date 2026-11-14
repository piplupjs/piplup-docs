'use client';

import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import { LocalizationProvider, MultiSectionDigitalClock } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { useMuiXMultiSectionDigitalClockAdapter } from '@piplup/rhf-adapters/mui-x-date-pickers';
import { useForm } from 'react-hook-form';

import type { Dayjs } from 'dayjs';
import type { Control } from 'react-hook-form';

type FormValues = { departure: Dayjs | null };

// Departures leave every 5 minutes, at :00 or :30 seconds past the minute.
// Each column is checked separately, so each section gets its own message.
function DepartureClock({ control }: { control: Control<FormValues> }) {
  const { error, helperText, required, ...adapter } = useMuiXMultiSectionDigitalClockAdapter<
    Dayjs,
    FormValues,
    'departure',
    HTMLDivElement
  >({
    composeHelperText: true,
    control,
    messages: {
      minutesStep: 'Departures leave every 5 minutes',
      required: 'Pick a departure time',
      'shouldDisableTime-seconds': 'Only :00 or :30 seconds',
    },
    minutesStep: 5,
    name: 'departure',
    required: true,
    shouldDisableTime: (value, view) => view === 'seconds' && value.second() % 30 !== 0,
  });

  return (
    <div>
      <MultiSectionDigitalClock
        ampm={false}
        timeSteps={{ minutes: 5, seconds: 30 }}
        views={['hours', 'minutes', 'seconds']}
        {...adapter}
      />
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </div>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { departure: null },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        onSubmit={handleSubmit((values) => alert(values.departure?.format('HH:mm:ss')))}
        noValidate
      >
        <Stack direction="column" spacing={2}>
          <DepartureClock control={control} />
          <div>
            <MuiButtonElement control={control} type="submit" variant="contained">
              Save departure
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
