"use client";

import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { MuiXDatePickerElement } from "@piplup/rhf-adapters/mui-x-date-pickers";
import type { Dayjs } from "dayjs";
import { useForm, useWatch } from "react-hook-form";

type Booking = { checkIn: Dayjs | null; checkOut: Dayjs | null };

export default function Page() {
  const { control, handleSubmit } = useForm<Booking>({
    defaultValues: { checkIn: null, checkOut: null },
  });
  const checkIn = useWatch({ control, name: "checkIn" });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        noValidate
        onSubmit={handleSubmit((values) =>
          alert(
            JSON.stringify(
              {
                checkIn: values.checkIn?.format("YYYY-MM-DD"),
                checkOut: values.checkOut?.format("YYYY-MM-DD"),
              },
              null,
              2,
            ),
          ),
        )}
      >
        <Stack direction="column" spacing={2}>
          <MuiXDatePickerElement
            control={control}
            name="checkIn"
            label="Check-in"
            required
            disablePast
            rules={{ deps: "checkOut" }}
            messages={{
              required: "Pick a check-in date",
              disablePast: "Check-in can't be in the past",
            }}
          />
          <MuiXDatePickerElement
            control={control}
            name="checkOut"
            label="Check-out"
            required
            minDate={checkIn ? checkIn.add(1, "day") : undefined}
            messages={{
              required: "Pick a check-out date",
              minDate: "Check-out must be after check-in",
            }}
          />
          <div>
            <MuiButtonElement control={control} variant="contained" type="submit">
              Book
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
