"use client";

import dayjs from "dayjs";
import { MuiXMonthCalendarElement } from "@piplup/rhf-adapters/mui-x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { FormContainer } from "@piplup/rhf-core";

export default function Page() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormContainer
        defaultValues={{ month: dayjs() }}
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
      >
        <MuiXMonthCalendarElement name="month" />
        <MuiButtonElement type="submit" variant="contained" sx={{ mt: 2 }}>
          Submit
        </MuiButtonElement>
      </FormContainer>
    </LocalizationProvider>
  );
}
