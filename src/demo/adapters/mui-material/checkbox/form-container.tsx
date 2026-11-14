'use client';

import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import { MuiButtonElement, MuiCheckboxElement } from '@piplup/rhf-adapters/mui-material';
import { FormContainer } from '@piplup/rhf-core';

export default function Page() {
  return (
    <FormContainer
      defaultValues={{ terms: true }}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
    >
      <Stack direction="column" spacing={2}>
        <FormControlLabel
          control={
            <MuiCheckboxElement
              transform={{
                input(value) {
                  // Checkbox expects value to be always array
                  return Array.isArray(value) ? value : [value];
                },
                output(event, checked) {
                  return checked;
                },
              }}
              name="terms"
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
