'use client';

import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import { LocalizationProvider, StaticDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { useMuiXStaticDateTimePickerAdapter } from '@piplup/rhf-adapters/mui-x-date-pickers';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

import type { Dayjs } from 'dayjs';
import type { Control } from 'react-hook-form';

type FormValues = { publishAt: Dayjs | null };

// Posts go out on the hour or half hour, from now up to two weeks ahead.
function PublishAtField({ control }: { control: Control<FormValues> }) {
  const { error, helperText, required, ...adapter } = useMuiXStaticDateTimePickerAdapter<
    Dayjs,
    FormValues,
    'publishAt',
    HTMLDivElement
  >({
    composeHelperText: true,
    control,
    disablePast: true,
    maxDate: dayjs().add(14, 'day'),
    messages: {
      disablePast: 'Choose a time later than now',
      maxDate: 'You can schedule up to two weeks ahead',
      required: 'Pick when to publish',
      'shouldDisableTime-minutes': 'Posts go out at :00 or :30',
    },
    minDate: dayjs(),
    name: 'publishAt',
    required: true,
    shouldDisableTime: (value, view) => view === 'minutes' && value.minute() % 30 !== 0,
  });

  return (
    <div>
      <StaticDateTimePicker ampm={false} slotProps={{ actionBar: { actions: [] } }} {...adapter} />
      {error && <FormHelperText error>{helperText}</FormHelperText>}
    </div>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { publishAt: null },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        onSubmit={handleSubmit((values) =>
          alert(`Scheduled for ${values.publishAt?.format('ddd D MMM, HH:mm')}`),
        )}
        noValidate
      >
        <Stack direction="column" spacing={2}>
          <PublishAtField control={control} />
          <div>
            <MuiButtonElement control={control} type="submit" variant="contained">
              Schedule post
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
