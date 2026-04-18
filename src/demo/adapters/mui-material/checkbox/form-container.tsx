"use client";

import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  MuiButtonElement,
  MuiCheckboxElement,
} from "@piplup/rhf-adapters/mui-material";
import { FormContainer } from "@piplup/rhf-core";

export default function Page() {
  return (
    <FormContainer
      defaultValues={{ terms: true }}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
    >
      <Stack spacing={2} direction="column">
        <FormControlLabel
          control={
            <MuiCheckboxElement
              name="terms"
              transform={{
                input(value) {
                  // Checkbox expects value to be always array
                  return Array.isArray(value) ? value : [value];
                },
                output(event, checked) {
                  return checked;
                },
              }}
            />
          }
          label="Accept terms & conditions"
          value={true}
        />
        <div>
          <MuiButtonElement type="submit" variant="contained">
            Submit
          </MuiButtonElement>
        </div>
      </Stack>
    </FormContainer>
  );
}
