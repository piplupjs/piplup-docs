"use client";

import dayjs, { type Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import { LocalizationProvider, TimeField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { useMuiXTimeFieldAdapter } from "@piplup/rhf-adapters/mui-x-date-pickers";
import { type Control, useForm } from "react-hook-form";

type FormValues = { checkIn: Dayjs | null };

// A typed-only time input. TimeField is a text field, so `error`, `helperText`
// and `onBlur` from the adapter go straight onto it.
function CheckInField({ control }: { control: Control<FormValues> }) {
  const adapter = useMuiXTimeFieldAdapter<Dayjs, FormValues, "checkIn", HTMLDivElement>({
    control,
    name: "checkIn",
    required: true,
    composeHelperText: true,
    helperText: "Between 14:00 and 23:00",
    minTime: dayjs().hour(14).minute(0),
    maxTime: dayjs().hour(23).minute(0),
    messages: {
      required: "Enter your arrival time",
      minTime: "Check-in opens at 14:00",
      maxTime: "Reception closes at 23:00",
    },
  });

  return <TimeField label="Arrival time" format="HH:mm" {...adapter} />;
}

export default function Page() {
  // mode "onBlur": the field validates as soon as you tab out of it.
  const { control, handleSubmit } = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: { checkIn: null },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        noValidate
        onSubmit={handleSubmit((values) => alert(values.checkIn?.format("HH:mm")))}
      >
        <Stack direction="column" spacing={2}>
          <CheckInField control={control} />
          <div>
            <MuiButtonElement control={control} variant="contained" type="submit">
              Save arrival
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
