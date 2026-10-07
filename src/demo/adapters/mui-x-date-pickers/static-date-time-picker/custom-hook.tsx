"use client";

import dayjs, { type Dayjs } from "dayjs";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import { LocalizationProvider, StaticDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { useMuiXStaticDateTimePickerAdapter } from "@piplup/rhf-adapters/mui-x-date-pickers";
import { type Control, useForm } from "react-hook-form";

type FormValues = { publishAt: Dayjs | null };

// Posts go out on the hour or half hour, from now up to two weeks ahead.
function PublishAtField({ control }: { control: Control<FormValues> }) {
  const { error, helperText, required: _required, ...adapter } = useMuiXStaticDateTimePickerAdapter<
    Dayjs,
    FormValues,
    "publishAt",
    HTMLDivElement
  >({
    control,
    name: "publishAt",
    required: true,
    composeHelperText: true,
    disablePast: true,
    minDate: dayjs(),
    maxDate: dayjs().add(14, "day"),
    shouldDisableTime: (value, view) => view === "minutes" && value.minute() % 30 !== 0,
    messages: {
      required: "Pick when to publish",
      disablePast: "Choose a time later than now",
      maxDate: "You can schedule up to two weeks ahead",
      "shouldDisableTime-minutes": "Posts go out at :00 or :30",
    },
  });

  return (
    <div>
      <StaticDateTimePicker
        ampm={false}
        slotProps={{ actionBar: { actions: [] } }}
        {...adapter}
      />
      {error && <FormHelperText error>{helperText}</FormHelperText>}
    </div>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { publishAt: null },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        noValidate
        onSubmit={handleSubmit((values) =>
          alert(`Scheduled for ${values.publishAt?.format("ddd D MMM, HH:mm")}`),
        )}
      >
        <Stack direction="column" spacing={2}>
          <PublishAtField control={control} />
          <div>
            <MuiButtonElement control={control} variant="contained" type="submit">
              Schedule post
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
