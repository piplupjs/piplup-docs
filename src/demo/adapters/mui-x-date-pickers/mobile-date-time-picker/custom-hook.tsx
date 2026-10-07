"use client";

import { useState } from "react";
import dayjs, { type Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import { LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { useMuiXMobileDateTimePickerAdapter } from "@piplup/rhf-adapters/mui-x-date-pickers";
import { type Control, useForm } from "react-hook-form";

type FormValues = { pickup: Dayjs | null };

// Orders need two hours to prepare. `disableIgnoringDatePartForTimeValidation`
// makes the hook compare `minTime` against the full date and time, so it works as
// a "not before this moment" rule instead of a daily opening time. `disablePast`
// makes the picker do the same, so the views grey out the right times.
function PickupField({ control }: { control: Control<FormValues> }) {
  const [earliest] = useState(() => dayjs().add(2, "hour").startOf("minute"));

  const adapter = useMuiXMobileDateTimePickerAdapter<Dayjs, FormValues, "pickup", HTMLDivElement>({
    control,
    name: "pickup",
    required: true,
    composeHelperText: true,
    disablePast: true,
    minDate: earliest,
    maxDate: earliest.add(30, "day"),
    minTime: earliest,
    disableIgnoringDatePartForTimeValidation: true,
    minutesStep: 30,
    messages: {
      required: "Choose a pickup time",
      minDate: `Pickup can't be before ${earliest.format("ddd D MMM")}`,
      minTime: `The earliest pickup is ${earliest.format("ddd HH:mm")}`,
      maxDate: "Orders can be placed up to 30 days ahead",
      minutesStep: "Pickups are every half hour",
    },
    slotProps: {
      textField: { helperText: "Tap to open the picker" },
    },
  });

  return <MobileDateTimePicker label="Pickup" ampm={false} {...adapter} />;
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { pickup: null },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        noValidate
        onSubmit={handleSubmit((values) =>
          alert(values.pickup?.format("ddd D MMM, HH:mm")),
        )}
      >
        <Stack direction="column" spacing={2}>
          <PickupField control={control} />
          <div>
            <MuiButtonElement control={control} variant="contained" type="submit">
              Place order
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
