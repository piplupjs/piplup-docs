"use client";

import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MuiXDesktopDateTimePickerElement } from "@piplup/rhf-adapters/mui-x-date-pickers";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { FormContainer } from "@piplup/rhf-core";

export default function Page() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormContainer
        defaultValues={{ startDateTime: dayjs() }}
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
      >
        <Stack direction="column" spacing={2}>
          <MuiXDesktopDateTimePickerElement name="startDateTime" label="Start datetime" />
          <div>
            <MuiButtonElement variant="contained" type="submit">
              Submit
            </MuiButtonElement>
          </div>
        </Stack>
      </FormContainer>
    </LocalizationProvider>
  );
}
