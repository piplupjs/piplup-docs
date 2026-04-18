"use client";

import dayjs from "dayjs";
import { MuiXDateCalendarElement } from "@piplup/rhf-adapters/mui-x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { FormContainer } from "@piplup/rhf-core";

export default function Page() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormContainer
        defaultValues={{ date: dayjs() }}
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
      >
        <MuiXDateCalendarElement name="date" />
        <MuiButtonElement type="submit" variant="contained" sx={{ mt: 2 }}>
          Submit
        </MuiButtonElement>
      </FormContainer>
    </LocalizationProvider>
  );
}
