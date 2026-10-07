"use client";

import dayjs, { type Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { useMuiXTimePickerAdapter } from "@piplup/rhf-adapters/mui-x-date-pickers";
import { type Control, useForm } from "react-hook-form";

type FormValues = { shiftStart: Dayjs | null };

// Only the time of day is compared, so the date part of these values does not matter.
const opensAt = dayjs().hour(8).minute(0);
const closesAt = dayjs().hour(18).minute(0);

// Shifts start between 08:00 and 18:00, on the quarter hour.
function ShiftStartField({ control }: { control: Control<FormValues> }) {
  const adapter = useMuiXTimePickerAdapter<Dayjs, FormValues, "shiftStart", HTMLDivElement>({
    control,
    name: "shiftStart",
    required: true,
    composeHelperText: true,
    minTime: opensAt,
    maxTime: closesAt,
    minutesStep: 15,
    messages: {
      required: "Pick a start time",
      minTime: "We open at 08:00",
      maxTime: "The last shift starts at 18:00",
      minutesStep: "Use a quarter hour (:00, :15, :30 or :45)",
    },
    slotProps: {
      textField: { helperText: "08:00 to 18:00, every 15 minutes" },
    },
  });

  return <TimePicker label="Shift start" ampm={false} {...adapter} />;
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { shiftStart: null },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        noValidate
        onSubmit={handleSubmit((values) => alert(values.shiftStart?.format("HH:mm")))}
      >
        <Stack direction="column" spacing={2}>
          <ShiftStartField control={control} />
          <div>
            <MuiButtonElement control={control} variant="contained" type="submit">
              Save shift
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
