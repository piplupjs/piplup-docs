"use client";

import dayjs, { type Dayjs } from "dayjs";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import { LocalizationProvider, StaticTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { useMuiXStaticTimePickerAdapter } from "@piplup/rhf-adapters/mui-x-date-pickers";
import { type Control, useForm } from "react-hook-form";

type FormValues = { reportTime: Dayjs | null };

const lastSend = dayjs().hour(20).minute(0);

// A static picker has no text field, so this component renders the
// error message itself, below the picker.
function ReportTimeField({ control }: { control: Control<FormValues> }) {
  const { error, helperText, ...adapter } = useMuiXStaticTimePickerAdapter<
    Dayjs,
    FormValues,
    "reportTime",
    HTMLDivElement
  >({
    control,
    name: "reportTime",
    required: true,
    composeHelperText: true,
    maxTime: lastSend,
    messages: {
      required: "Pick a time for the daily report",
      maxTime: "Reports can't be sent after 20:00",
    },
  });

  return (
    <div>
      <StaticTimePicker ampm={false} {...adapter} />
      <FormHelperText error={error}>
        {helperText || "Reports go out once a day, no later than 20:00"}
      </FormHelperText>
    </div>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { reportTime: null },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        noValidate
        onSubmit={handleSubmit((values) => alert(values.reportTime?.format("HH:mm")))}
      >
        <Stack direction="column" spacing={2}>
          <ReportTimeField control={control} />
          <div>
            <MuiButtonElement control={control} variant="contained" type="submit">
              Save schedule
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
