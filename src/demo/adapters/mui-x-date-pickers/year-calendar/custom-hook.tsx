'use client';

import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { LocalizationProvider, YearCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { useMuiXYearCalendarAdapter } from '@piplup/rhf-adapters/mui-x-date-pickers';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

import type { Dayjs } from 'dayjs';
import type { Control } from 'react-hook-form';

type FormValues = { joinedIn: Dayjs | null };

function JoinedYearField({ control }: { control: Control<FormValues> }) {
  // Remove the props YearCalendar does not accept; it would pass them to its root <div>.
  const { error, helperText, required, shouldDisableDate, shouldDisableMonth, ...adapter } =
    useMuiXYearCalendarAdapter<Dayjs, FormValues, 'joinedIn', HTMLDivElement>({
      composeHelperText: true,
      control,
      helperText: 'Pick the year you started.',
      maxDate: dayjs(),
      messages: {
        maxDate: "That year hasn't happened yet",
        minDate: 'We were founded in 1970',
        required: 'Select the year you joined',
      },
      // minDate and maxDate also set the range of years the grid lists.
      minDate: dayjs('1970-01-01'),
      name: 'joinedIn',
      required: true,
    });

  return (
    <div>
      <Typography id="joined-in-label" variant="subtitle2">
        Year you joined the company
      </Typography>
      <YearCalendar gridLabelId="joined-in-label" yearsOrder="desc" {...adapter} />
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </div>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { joinedIn: null },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        onSubmit={handleSubmit((values) => {
          const years = dayjs().year() - (values.joinedIn?.year() ?? 0);
          alert(`${years} years with the company`);
        })}
        noValidate
      >
        <Stack direction="column" spacing={2}>
          <JoinedYearField control={control} />
          <div>
            <MuiButtonElement control={control} type="submit" variant="contained">
              Save
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
