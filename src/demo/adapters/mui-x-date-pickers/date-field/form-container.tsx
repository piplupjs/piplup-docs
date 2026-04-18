"use client";

import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import { MuiXDateFieldElement } from "@piplup/rhf-adapters/mui-x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { FormContainer } from "@piplup/rhf-core";

export default function Page() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormContainer
        defaultValues={{ birthday: dayjs() }}
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
      >
        <Stack direction="column" spacing={2}>
          <MuiXDateFieldElement
            name="birthday"
            label="Birthday"
          />
          <div>
            <MuiButtonElement
              type="submit"
              variant="contained"
            >
              Submit
            </MuiButtonElement>
          </div>
        </Stack>
      </FormContainer>
    </LocalizationProvider>
  );
}
