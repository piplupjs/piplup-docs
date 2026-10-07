"use client";

import dayjs, { type Dayjs } from "dayjs";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { useMuiXStaticDatePickerAdapter } from "@piplup/rhf-adapters/mui-x-date-pickers";
import { type Control, useForm } from "react-hook-form";

type FormValues = { tour: Dayjs | null };

// Dates that are already sold out, e.g. loaded from an API.
const soldOut = new Set(
  [3, 4, 10].map((days) => dayjs().add(days, "day").format("YYYY-MM-DD")),
);

function TourDateField({ control }: { control: Control<FormValues> }) {
  // StaticDatePicker has no text field: take the message out and render it below.
  const { error, helperText, required: _required, ...adapter } = useMuiXStaticDatePickerAdapter<
    Dayjs,
    FormValues,
    "tour",
    HTMLDivElement
  >({
    control,
    name: "tour",
    required: true,
    composeHelperText: true,
    disablePast: true,
    maxDate: dayjs().add(60, "day"),
    shouldDisableDate: (date) => soldOut.has(date.format("YYYY-MM-DD")),
    messages: {
      required: "Pick a tour date",
      shouldDisableDate: "This tour is sold out",
      maxDate: "Tours open 60 days in advance",
    },
  });

  return (
    <div>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        slotProps={{ actionBar: { actions: [] } }}
        {...adapter}
      />
      {error && <FormHelperText error>{helperText}</FormHelperText>}
    </div>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { tour: null },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        noValidate
        onSubmit={handleSubmit((values) =>
          alert(values.tour?.format("dddd, D MMMM YYYY")),
        )}
      >
        <Stack direction="column" spacing={2}>
          <TourDateField control={control} />
          <div>
            <MuiButtonElement control={control} variant="contained" type="submit">
              Reserve
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
