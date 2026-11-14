'use client';

import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import { LocalizationProvider, StaticTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { useMuiXStaticTimePickerAdapter } from '@piplup/rhf-adapters/mui-x-date-pickers';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

import type { Dayjs } from 'dayjs';
import type { Control } from 'react-hook-form';

type FormValues = { reportTime: Dayjs | null };

const lastSend = dayjs().hour(20).minute(0);

// A static picker has no text field, so this component renders the
// error message itself, below the picker.
function ReportTimeField({ control }: { control: Control<FormValues> }) {
  const { error, helperText, ...adapter } = useMuiXStaticTimePickerAdapter<
    Dayjs,
    FormValues,
    'reportTime',
    HTMLDivElement
  >({
    composeHelperText: true,
    control,
    maxTime: lastSend,
    messages: {
      maxTime: "Reports can't be sent after 20:00",
      required: 'Pick a time for the daily report',
    },
    name: 'reportTime',
    required: true,
  });

  return (
    <div>
      <StaticTimePicker ampm={false} {...adapter} />
      <FormHelperText error={error}>
        {helperText || 'Reports go out once a day, no later than 20:00'}
      </FormHelperText>
    </div>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { reportTime: null },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        onSubmit={handleSubmit((values) => alert(values.reportTime?.format('HH:mm')))}
        noValidate
      >
        <Stack direction="column" spacing={2}>
          <ReportTimeField control={control} />
          <div>
            <MuiButtonElement control={control} type="submit" variant="contained">
              Save schedule
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
