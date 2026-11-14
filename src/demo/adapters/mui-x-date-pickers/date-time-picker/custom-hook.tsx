'use client';

import Stack from '@mui/material/Stack';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { useMuiXDateTimePickerAdapter } from '@piplup/rhf-adapters/mui-x-date-pickers';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

import type { Dayjs } from 'dayjs';
import type { Control } from 'react-hook-form';

type FormValues = { meeting: Dayjs | null };

// Office hours: 09:00 to 17:00 on any day, in 15 minute slots, booked from tomorrow.
// minTime and maxTime compare the time of day only, so they apply to every date.
function MeetingField({ control }: { control: Control<FormValues> }) {
  const adapter = useMuiXDateTimePickerAdapter<Dayjs, FormValues, 'meeting', HTMLDivElement>({
    composeHelperText: true,
    control,
    maxDate: dayjs().add(3, 'month'),
    maxTime: dayjs().hour(17).startOf('hour'),
    messages: {
      maxDate: 'Meetings can be booked up to three months ahead',
      maxTime: 'Meetings must start by 17:00',
      minDate: 'Meetings can be booked from tomorrow',
      minTime: 'Meetings start at 09:00 or later',
      minutesStep: 'Use a 15 minute slot (:00, :15, :30 or :45)',
      required: 'Pick a meeting time',
    },
    // The date-time hooks type minDate and maxDate as required.
    minDate: dayjs().add(1, 'day').startOf('day'),
    minTime: dayjs().hour(9).startOf('hour'),
    minutesStep: 15,
    name: 'meeting',
    required: true,
    slotProps: {
      textField: { helperText: 'From tomorrow, 09:00 to 17:00' },
    },
  });

  return <DateTimePicker ampm={false} label="Meeting" {...adapter} />;
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { meeting: null },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        onSubmit={handleSubmit((values) => alert(values.meeting?.format('ddd D MMM, HH:mm')))}
        noValidate
      >
        <Stack direction="column" spacing={2}>
          <MeetingField control={control} />
          <div>
            <MuiButtonElement control={control} type="submit" variant="contained">
              Book meeting
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
