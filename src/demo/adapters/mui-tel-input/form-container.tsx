'use client';

import Stack from '@mui/material/Stack';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { MuiTelInputElement } from '@piplup/rhf-adapters/mui-tel-input';
import { FormContainer } from '@piplup/rhf-core';

export default function Page() {
  return (
    <FormContainer
      defaultValues={{ phone: '+1 555 123 4567' }}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
    >
      <Stack direction="column" spacing={2}>
        <MuiTelInputElement label="Phone number" name="phone" />
        <div>
          <MuiButtonElement type="submit" variant="contained">
            Submit
          </MuiButtonElement>
        </div>
      </Stack>
    </FormContainer>
  );
}
