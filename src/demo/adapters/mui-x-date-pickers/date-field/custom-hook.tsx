"use client";

import dayjs, { type Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { useMuiXDateFieldAdapter } from "@piplup/rhf-adapters/mui-x-date-pickers";
import { type Control, useForm } from "react-hook-form";

type FormValues = { birthDate: Dayjs | null };

// A keyboard-only birth date field. Users must be 18 or older.
function BirthDateField({ control }: { control: Control<FormValues> }) {
  const adapter = useMuiXDateFieldAdapter<Dayjs, FormValues, "birthDate", HTMLDivElement>({
    control,
    name: "birthDate",
    required: true,
    composeHelperText: true,
    helperText: "DD/MM/YYYY",
    disableFuture: true,
    minDate: dayjs("1900-01-01"),
    maxDate: dayjs().subtract(18, "year"),
    messages: {
      required: "Enter your date of birth",
      invalidDate: () => "Finish typing the date",
      disableFuture: "Date of birth can't be in the future",
      minDate: "Enter a date after 1900",
      maxDate: "You must be 18 or older to sign up",
    },
  });

  return <DateField label="Date of birth" format="DD/MM/YYYY" {...adapter} />;
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { birthDate: null },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        noValidate
        onSubmit={handleSubmit((values) =>
          alert(values.birthDate?.format("YYYY-MM-DD")),
        )}
      >
        <Stack direction="column" spacing={2}>
          <BirthDateField control={control} />
          <div>
            <MuiButtonElement control={control} variant="contained" type="submit">
              Continue
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
