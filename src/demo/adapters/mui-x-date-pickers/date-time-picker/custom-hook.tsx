"use client";

import dayjs, { type Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { useMuiXDateTimePickerAdapter } from "@piplup/rhf-adapters/mui-x-date-pickers";
import { type Control, useForm } from "react-hook-form";

type FormValues = { meeting: Dayjs | null };

// Office hours: 09:00 to 17:00 on any day, in 15 minute slots, booked from tomorrow.
// minTime and maxTime compare the time of day only, so they apply to every date.
function MeetingField({ control }: { control: Control<FormValues> }) {
  const adapter = useMuiXDateTimePickerAdapter<Dayjs, FormValues, "meeting", HTMLDivElement>({
    control,
    name: "meeting",
    required: true,
    composeHelperText: true,
    // The date-time hooks type minDate and maxDate as required.
    minDate: dayjs().add(1, "day").startOf("day"),
    maxDate: dayjs().add(3, "month"),
    minTime: dayjs().hour(9).startOf("hour"),
    maxTime: dayjs().hour(17).startOf("hour"),
    minutesStep: 15,
    messages: {
      required: "Pick a meeting time",
      minDate: "Meetings can be booked from tomorrow",
      maxDate: "Meetings can be booked up to three months ahead",
      minTime: "Meetings start at 09:00 or later",
      maxTime: "Meetings must start by 17:00",
      minutesStep: "Use a 15 minute slot (:00, :15, :30 or :45)",
    },
    slotProps: {
      textField: { helperText: "From tomorrow, 09:00 to 17:00" },
    },
  });

  return <DateTimePicker label="Meeting" ampm={false} {...adapter} />;
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { meeting: null },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        noValidate
        onSubmit={handleSubmit((values) =>
          alert(values.meeting?.format("ddd D MMM, HH:mm")),
        )}
      >
        <Stack direction="column" spacing={2}>
          <MeetingField control={control} />
          <div>
            <MuiButtonElement control={control} variant="contained" type="submit">
              Book meeting
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
