"use client";

import dayjs, { type Dayjs } from "dayjs";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import { DigitalClock, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { useMuiXDigitalClockAdapter } from "@piplup/rhf-adapters/mui-x-date-pickers";
import { type Control, useForm } from "react-hook-form";

type FormValues = { slot: Dayjs | null };

const bookedSlots = ["10:00", "13:30", "15:00"];

// DigitalClock lists one option per `timeStep` and checks each option with
// `shouldDisableTime(option, "hours")`, so the booked check runs for the "hours" view.
function SlotPicker({ control }: { control: Control<FormValues> }) {
  const {
    error,
    helperText,
    required: _required,
    ...adapter
  } = useMuiXDigitalClockAdapter<Dayjs, FormValues, "slot", HTMLDivElement>({
    control,
    name: "slot",
    required: true,
    composeHelperText: true,
    minTime: dayjs().hour(9).minute(0),
    maxTime: dayjs().hour(16).minute(30),
    shouldDisableTime: (value, view) =>
      view === "hours" && bookedSlots.includes(value.format("HH:mm")),
    messages: {
      required: "Pick a free slot",
      "shouldDisableTime-hours": "That slot is already booked",
    },
  });

  return (
    <div>
      <DigitalClock ampm={false} timeStep={30} skipDisabled {...adapter} />
      <FormHelperText error={error}>
        {helperText || "30-minute slots, 09:00 to 16:30"}
      </FormHelperText>
    </div>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { slot: null },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        noValidate
        onSubmit={handleSubmit((values) => alert(values.slot?.format("HH:mm")))}
      >
        <Stack direction="column" spacing={2}>
          <SlotPicker control={control} />
          <div>
            <MuiButtonElement control={control} variant="contained" type="submit">
              Book slot
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
