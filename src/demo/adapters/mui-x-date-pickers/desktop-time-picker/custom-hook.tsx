'use client';

import Stack from '@mui/material/Stack';
import { DesktopTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { useMuiXDesktopTimePickerAdapter } from '@piplup/rhf-adapters/mui-x-date-pickers';
import { useForm } from 'react-hook-form';

import type { Dayjs } from 'dayjs';
import type { Control } from 'react-hook-form';

type FormValues = { meeting: Dayjs | null };

// The 12:00 hour is lunch. The clock greys it out, and a typed 12:xx time
// fails validation with the "shouldDisableTime-hours" message.
function MeetingTimeField({ control }: { control: Control<FormValues> }) {
  const adapter = useMuiXDesktopTimePickerAdapter<Dayjs, FormValues, 'meeting', HTMLDivElement>({
    composeHelperText: true,
    control,
    messages: {
      required: 'Pick a meeting time',
      'shouldDisableTime-hours': 'No meetings over lunch (12:00 to 13:00)',
    },
    name: 'meeting',
    required: true,
    shouldDisableTime: (value, view) => view === 'hours' && value.hour() === 12,
    slotProps: {
      textField: { helperText: 'Type a time or use the clock button' },
    },
  });

  return <DesktopTimePicker label="Meeting time" {...adapter} />;
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { meeting: null },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit((values) => alert(values.meeting?.format('h:mm A')))} noValidate>
        <Stack direction="column" spacing={2}>
          <MeetingTimeField control={control} />
          <div>
            <MuiButtonElement control={control} type="submit" variant="contained">
              Schedule
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
