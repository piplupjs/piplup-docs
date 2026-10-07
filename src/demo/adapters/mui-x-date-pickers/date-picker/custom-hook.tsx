"use client";

import type { Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { useMuiXDatePickerAdapter } from "@piplup/rhf-adapters/mui-x-date-pickers";
import { type Control, useForm } from "react-hook-form";

type FormValues = { appointment: Dayjs | null };

// A reusable field with project-wide defaults baked in: weekdays only,
// no past dates, and custom validation messages.
function AppointmentField({ control }: { control: Control<FormValues> }) {
  const adapter = useMuiXDatePickerAdapter<Dayjs, FormValues, "appointment", HTMLDivElement>({
    control,
    name: "appointment",
    required: true,
    composeHelperText: true,
    disablePast: true,
    shouldDisableDate: (date) => date.day() === 0 || date.day() === 6,
    messages: {
      required: "Pick a date for your appointment",
      disablePast: "Appointments can't be in the past",
      shouldDisableDate: "We're closed on weekends",
    },
    slotProps: {
      textField: { helperText: "Weekdays only" },
    },
  });

  return <DatePicker label="Appointment" {...adapter} />;
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { appointment: null },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        noValidate
        onSubmit={handleSubmit((values) =>
          alert(values.appointment?.format("dddd, D MMMM YYYY")),
        )}
      >
        <Stack direction="column" spacing={2}>
          <AppointmentField control={control} />
          <div>
            <MuiButtonElement control={control} variant="contained" type="submit">
              Book
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}

