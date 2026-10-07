"use client";

import dayjs, { type Dayjs } from "dayjs";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { useMuiXDateCalendarAdapter } from "@piplup/rhf-adapters/mui-x-date-pickers";
import { type Control, useForm } from "react-hook-form";

type FormValues = { delivery: Dayjs | null };

// DateCalendar has no text field, so this component renders the error itself.
function DeliveryCalendar({ control }: { control: Control<FormValues> }) {
  const { error, helperText, required: _required, ...adapter } = useMuiXDateCalendarAdapter<
    Dayjs,
    FormValues,
    "delivery",
    HTMLDivElement
  >({
    control,
    name: "delivery",
    required: true,
    composeHelperText: true,
    helperText: "We deliver Monday to Saturday.",
    disablePast: true,
    maxDate: dayjs().add(30, "day"),
    shouldDisableDate: (date) => date.day() === 0,
    messages: {
      required: "Choose a delivery day",
      disablePast: "That day has passed. Pick a new one.",
      shouldDisableDate: "We don't deliver on Sundays",
      maxDate: "We only schedule 30 days ahead",
    },
  });

  return (
    <div>
      <DateCalendar {...adapter} />
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </div>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    // A saved draft from yesterday: the calendar shows it, validation rejects it.
    defaultValues: { delivery: dayjs().subtract(1, "day") },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        noValidate
        onSubmit={handleSubmit((values) =>
          alert(values.delivery?.format("dddd, D MMMM YYYY")),
        )}
      >
        <Stack direction="column" spacing={2}>
          <DeliveryCalendar control={control} />
          <div>
            <MuiButtonElement control={control} variant="contained" type="submit">
              Schedule delivery
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
