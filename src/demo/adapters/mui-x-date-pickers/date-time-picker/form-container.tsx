"use client";

import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import { MuiXDateTimePickerElement } from "@piplup/rhf-adapters/mui-x-date-pickers";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FormContainer } from "@piplup/rhf-core";

export default function Page() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormContainer
        defaultValues={{ appointment: dayjs() }}
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
      >
        <Stack direction="column" spacing={2}>
          <MuiXDateTimePickerElement name="appointment" label="Appointment" />
          <div>
            <MuiButtonElement variant="contained" type="submit">
              Submt
            </MuiButtonElement>
          </div>
        </Stack>
      </FormContainer>
    </LocalizationProvider>
  );
}
