'use client';

import Stack from '@mui/material/Stack';
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { useMuiXDateFieldAdapter } from '@piplup/rhf-adapters/mui-x-date-pickers';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

import type { Dayjs } from 'dayjs';
import type { Control } from 'react-hook-form';

type FormValues = { birthDate: Dayjs | null };

// A keyboard-only birth date field. Users must be 18 or older.
function BirthDateField({ control }: { control: Control<FormValues> }) {
  const adapter = useMuiXDateFieldAdapter<Dayjs, FormValues, 'birthDate', HTMLDivElement>({
    composeHelperText: true,
    control,
    disableFuture: true,
    helperText: 'DD/MM/YYYY',
    maxDate: dayjs().subtract(18, 'year'),
    messages: {
      disableFuture: "Date of birth can't be in the future",
      invalidDate: () => 'Finish typing the date',
      maxDate: 'You must be 18 or older to sign up',
      minDate: 'Enter a date after 1900',
      required: 'Enter your date of birth',
    },
    minDate: dayjs('1900-01-01'),
    name: 'birthDate',
    required: true,
  });

  return <DateField format="DD/MM/YYYY" label="Date of birth" {...adapter} />;
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { birthDate: null },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        onSubmit={handleSubmit((values) => alert(values.birthDate?.format('YYYY-MM-DD')))}
        noValidate
      >
        <Stack direction="column" spacing={2}>
          <BirthDateField control={control} />
          <div>
            <MuiButtonElement control={control} type="submit" variant="contained">
              Continue
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
