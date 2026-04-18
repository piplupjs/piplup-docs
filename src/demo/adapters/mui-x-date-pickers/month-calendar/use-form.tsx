"use client";

import dayjs from "dayjs";
import { MuiXMonthCalendarElement } from "@piplup/rhf-adapters/mui-x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { useForm } from "react-hook-form";

export default function Page() {
  const { control, handleSubmit } = useForm({
    defaultValues: { month: dayjs() },
  });
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        onSubmit={handleSubmit((values) =>
          alert(JSON.stringify(values, null, 2)),
        )}
      >
        <MuiXMonthCalendarElement control={control} name="month" />
        <MuiButtonElement
          control={control}
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Submit
        </MuiButtonElement>
      </form>
    </LocalizationProvider>
  );
}
