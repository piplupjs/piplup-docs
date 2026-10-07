"use client";

import type { Dayjs } from "dayjs";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import { LocalizationProvider, MultiSectionDigitalClock } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { useMuiXMultiSectionDigitalClockAdapter } from "@piplup/rhf-adapters/mui-x-date-pickers";
import { type Control, useForm } from "react-hook-form";

type FormValues = { departure: Dayjs | null };

// Departures leave every 5 minutes, at :00 or :30 seconds past the minute.
// Each column is checked separately, so each section gets its own message.
function DepartureClock({ control }: { control: Control<FormValues> }) {
  const {
    error,
    helperText,
    required: _required,
    ...adapter
  } = useMuiXMultiSectionDigitalClockAdapter<Dayjs, FormValues, "departure", HTMLDivElement>({
    control,
    name: "departure",
    required: true,
    composeHelperText: true,
    minutesStep: 5,
    shouldDisableTime: (value, view) => view === "seconds" && value.second() % 30 !== 0,
    messages: {
      required: "Pick a departure time",
      minutesStep: "Departures leave every 5 minutes",
      "shouldDisableTime-seconds": "Only :00 or :30 seconds",
    },
  });

  return (
    <div>
      <MultiSectionDigitalClock
        ampm={false}
        views={["hours", "minutes", "seconds"]}
        timeSteps={{ minutes: 5, seconds: 30 }}
        {...adapter}
      />
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </div>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { departure: null },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        noValidate
        onSubmit={handleSubmit((values) => alert(values.departure?.format("HH:mm:ss")))}
      >
        <Stack direction="column" spacing={2}>
          <DepartureClock control={control} />
          <div>
            <MuiButtonElement control={control} variant="contained" type="submit">
              Save departure
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
