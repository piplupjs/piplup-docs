"use client";

import dayjs from "dayjs";
import Stack from '@mui/material/Stack';
import { MuiXDateTimePickerElement } from "@piplup/rhf-adapters/mui-x-date-pickers";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useForm } from "react-hook-form";

export default function Page() {
  const { control, handleSubmit } = useForm({
    defaultValues: { appointment: dayjs() },
  });
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        onSubmit={handleSubmit((values) =>
          alert(JSON.stringify(values, null, 2)),
        )}
      >
        <Stack direction="column" spacing={2}>
          <MuiXDateTimePickerElement
            control={control}
            name="appointment"
            label="Appointment"
          />
          <div>
            <MuiButtonElement
              control={control}
              variant="contained"
              type="submit"
            >
              Submt
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
