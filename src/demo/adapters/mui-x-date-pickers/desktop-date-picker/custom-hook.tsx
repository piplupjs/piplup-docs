"use client";

import type { Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { useMuiXDesktopDatePickerAdapter } from "@piplup/rhf-adapters/mui-x-date-pickers";
import { type Control, useForm, useWatch } from "react-hook-form";

type FormValues = { checkIn: Dayjs | null; checkOut: Dayjs | null };

function CheckInField({ control }: { control: Control<FormValues> }) {
  const adapter = useMuiXDesktopDatePickerAdapter<Dayjs, FormValues, "checkIn", HTMLDivElement>({
    control,
    name: "checkIn",
    required: true,
    composeHelperText: true,
    disablePast: true,
    messages: {
      required: "Choose a check-in date",
      disablePast: "Check-in can't be in the past",
    },
  });

  return <DesktopDatePicker label="Check-in" {...adapter} />;
}

function CheckOutField({ control }: { control: Control<FormValues> }) {
  const checkIn = useWatch({ control, name: "checkIn" });

  const adapter = useMuiXDesktopDatePickerAdapter<Dayjs, FormValues, "checkOut", HTMLDivElement>({
    control,
    name: "checkOut",
    required: true,
    composeHelperText: true,
    // At least one night, at most 14. The limits follow the current check-in value
    // because the rules are rebuilt on every render.
    minDate: checkIn?.add(1, "day"),
    maxDate: checkIn?.add(14, "day"),
    messages: {
      required: "Choose a check-out date",
      minDate: "Check-out must be after check-in",
      maxDate: "Stays are limited to 14 nights",
    },
  });

  return <DesktopDatePicker label="Check-out" {...adapter} />;
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { checkIn: null, checkOut: null },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        noValidate
        onSubmit={handleSubmit(({ checkIn, checkOut }) =>
          alert(`${checkOut?.diff(checkIn, "day")} nights`),
        )}
      >
        <Stack direction="column" spacing={2}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <CheckInField control={control} />
            <CheckOutField control={control} />
          </Stack>
          <div>
            <MuiButtonElement control={control} variant="contained" type="submit">
              Check availability
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
