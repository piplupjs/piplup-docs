"use client";

import type { Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import { DesktopTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { useMuiXDesktopTimePickerAdapter } from "@piplup/rhf-adapters/mui-x-date-pickers";
import { type Control, useForm } from "react-hook-form";

type FormValues = { meeting: Dayjs | null };

// The 12:00 hour is lunch. The clock greys it out, and a typed 12:xx time
// fails validation with the "shouldDisableTime-hours" message.
function MeetingTimeField({ control }: { control: Control<FormValues> }) {
  const adapter = useMuiXDesktopTimePickerAdapter<Dayjs, FormValues, "meeting", HTMLDivElement>({
    control,
    name: "meeting",
    required: true,
    composeHelperText: true,
    shouldDisableTime: (value, view) => view === "hours" && value.hour() === 12,
    messages: {
      required: "Pick a meeting time",
      "shouldDisableTime-hours": "No meetings over lunch (12:00 to 13:00)",
    },
    slotProps: {
      textField: { helperText: "Type a time or use the clock button" },
    },
  });

  return <DesktopTimePicker label="Meeting time" {...adapter} />;
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { meeting: null },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        noValidate
        onSubmit={handleSubmit((values) => alert(values.meeting?.format("h:mm A")))}
      >
        <Stack direction="column" spacing={2}>
          <MeetingTimeField control={control} />
          <div>
            <MuiButtonElement control={control} variant="contained" type="submit">
              Schedule
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
