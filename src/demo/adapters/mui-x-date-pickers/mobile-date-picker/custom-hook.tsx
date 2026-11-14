'use client';

import Stack from '@mui/material/Stack';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { useMuiXMobileDatePickerAdapter } from '@piplup/rhf-adapters/mui-x-date-pickers';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

import type { Dayjs } from 'dayjs';
import type { Control } from 'react-hook-form';

type FormValues = { crossing: Dayjs | null };

// The ferry runs April to October (months 3 to 9 in dayjs), up to next year.
function isOffSeason(date: Dayjs) {
  return date.month() < 3 || date.month() > 9;
}

function FerryDateField({ control }: { control: Control<FormValues> }) {
  const adapter = useMuiXMobileDatePickerAdapter<Dayjs, FormValues, 'crossing', HTMLDivElement>({
    composeHelperText: true,
    control,
    disablePast: true,
    maxDate: dayjs().add(1, 'year').endOf('year'),
    messages: {
      disablePast: 'That crossing has already sailed',
      maxDate: 'Bookings open one season ahead',
      required: 'Choose a crossing date',
      shouldDisableMonth: 'The ferry only runs from April to October',
    },
    name: 'crossing',
    required: true,
    shouldDisableMonth: isOffSeason,
    slotProps: {
      textField: { helperText: 'Season: April to October' },
    },
  });

  return (
    <MobileDatePicker
      label="Crossing date"
      openTo="month"
      views={['year', 'month', 'day']}
      {...adapter}
    />
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { crossing: null },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        onSubmit={handleSubmit((values) => alert(values.crossing?.format('dddd, D MMMM YYYY')))}
        noValidate
      >
        <Stack direction="column" spacing={2}>
          <FerryDateField control={control} />
          <div>
            <MuiButtonElement control={control} type="submit" variant="contained">
              Book crossing
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
