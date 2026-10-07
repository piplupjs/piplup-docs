"use client";

import dayjs, { type Dayjs } from "dayjs";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { LocalizationProvider, YearCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { useMuiXYearCalendarAdapter } from "@piplup/rhf-adapters/mui-x-date-pickers";
import { type Control, useForm } from "react-hook-form";

type FormValues = { joinedIn: Dayjs | null };

function JoinedYearField({ control }: { control: Control<FormValues> }) {
  // Remove the props YearCalendar does not accept; it would pass them to its root <div>.
  const {
    error,
    helperText,
    required: _required,
    shouldDisableDate: _shouldDisableDate,
    shouldDisableMonth: _shouldDisableMonth,
    ...adapter
  } = useMuiXYearCalendarAdapter<
    Dayjs,
    FormValues,
    "joinedIn",
    HTMLDivElement
  >({
    control,
    name: "joinedIn",
    required: true,
    composeHelperText: true,
    helperText: "Pick the year you started.",
    // minDate and maxDate also set the range of years the grid lists.
    minDate: dayjs("1970-01-01"),
    maxDate: dayjs(),
    messages: {
      required: "Select the year you joined",
      maxDate: "That year hasn't happened yet",
      minDate: "We were founded in 1970",
    },
  });

  return (
    <div>
      <Typography variant="subtitle2" id="joined-in-label">
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
        noValidate
        onSubmit={handleSubmit((values) => {
          const years = dayjs().year() - (values.joinedIn?.year() ?? 0);
          alert(`${years} years with the company`);
        })}
      >
        <Stack direction="column" spacing={2}>
          <JoinedYearField control={control} />
          <div>
            <MuiButtonElement control={control} variant="contained" type="submit">
              Save
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
