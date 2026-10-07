"use client";

import type { Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import { LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { useMuiXMobileTimePickerAdapter } from "@piplup/rhf-adapters/mui-x-date-pickers";
import { type Control, useForm } from "react-hook-form";

type FormValues = { pickup: Dayjs | null };

// Same-day pickup: the chosen time must still be ahead of now.
function PickupTimeField({ control }: { control: Control<FormValues> }) {
  const adapter = useMuiXMobileTimePickerAdapter<Dayjs, FormValues, "pickup", HTMLDivElement>({
    control,
    name: "pickup",
    required: true,
    composeHelperText: true,
    disablePast: true,
    messages: {
      required: "Choose a pickup time",
      disablePast: "That time has already passed today",
    },
    slotProps: {
      textField: { helperText: "Tap to open the clock" },
    },
  });

  return <MobileTimePicker label="Pickup time (today)" {...adapter} />;
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { pickup: null },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        noValidate
        onSubmit={handleSubmit((values) => alert(values.pickup?.format("h:mm A")))}
      >
        <Stack direction="column" spacing={2}>
          <PickupTimeField control={control} />
          <div>
            <MuiButtonElement control={control} variant="contained" type="submit">
              Confirm pickup
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
