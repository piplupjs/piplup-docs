"use client";

import dayjs, { type Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { useMuiXMobileDatePickerAdapter } from "@piplup/rhf-adapters/mui-x-date-pickers";
import { type Control, useForm } from "react-hook-form";

type FormValues = { crossing: Dayjs | null };

// The ferry runs April to October (months 3 to 9 in dayjs), up to next year.
function isOffSeason(date: Dayjs) {
  return date.month() < 3 || date.month() > 9;
}

function FerryDateField({ control }: { control: Control<FormValues> }) {
  const adapter = useMuiXMobileDatePickerAdapter<Dayjs, FormValues, "crossing", HTMLDivElement>({
    control,
    name: "crossing",
    required: true,
    composeHelperText: true,
    disablePast: true,
    maxDate: dayjs().add(1, "year").endOf("year"),
    shouldDisableMonth: isOffSeason,
    messages: {
      required: "Choose a crossing date",
      disablePast: "That crossing has already sailed",
      shouldDisableMonth: "The ferry only runs from April to October",
      maxDate: "Bookings open one season ahead",
    },
    slotProps: {
      textField: { helperText: "Season: April to October" },
    },
  });

  return (
    <MobileDatePicker
      label="Crossing date"
      views={["year", "month", "day"]}
      openTo="month"
      {...adapter}
    />
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { crossing: null },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        noValidate
        onSubmit={handleSubmit((values) =>
          alert(values.crossing?.format("dddd, D MMMM YYYY")),
        )}
      >
        <Stack direction="column" spacing={2}>
          <FerryDateField control={control} />
          <div>
            <MuiButtonElement control={control} variant="contained" type="submit">
              Book crossing
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
