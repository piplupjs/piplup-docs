"use client";

import dayjs, { type Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import { DesktopDateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { useMuiXDesktopDateTimePickerAdapter } from "@piplup/rhf-adapters/mui-x-date-pickers";
import { type Control, useForm } from "react-hook-form";

type FormValues = { callback: Dayjs | null };

// Support calls happen between 08:00 and 20:00, never during the 13:00 lunch hour.
function isClosedHour(hour: number) {
  return hour < 8 || hour >= 20 || hour === 13;
}

function CallbackField({ control }: { control: Control<FormValues> }) {
  const adapter = useMuiXDesktopDateTimePickerAdapter<
    Dayjs,
    FormValues,
    "callback",
    HTMLDivElement
  >({
    control,
    name: "callback",
    required: true,
    composeHelperText: true,
    disablePast: true,
    minDate: dayjs(),
    maxDate: dayjs().add(14, "day"),
    shouldDisableTime: (value, view) => view === "hours" && isClosedHour(value.hour()),
    messages: {
      required: "When should we call you?",
      disablePast: "Pick a time in the future",
      maxDate: "We can call you within the next two weeks",
      "shouldDisableTime-hours": "We call between 08:00 and 20:00, except 13:00 to 14:00",
    },
    // A function is called with the picker's owner state; the adapter adds its own
    // error, helperText and onBlur on top of what it returns.
    slotProps: {
      textField: () => ({ helperText: "Times are in your local time zone" }),
    },
  });

  return <DesktopDateTimePicker label="Call me back at" ampm={false} {...adapter} />;
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { callback: null },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        noValidate
        onSubmit={handleSubmit((values) =>
          alert(values.callback?.format("ddd D MMM, HH:mm")),
        )}
      >
        <Stack direction="column" spacing={2}>
          <CallbackField control={control} />
          <div>
            <MuiButtonElement control={control} variant="contained" type="submit">
              Request callback
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
