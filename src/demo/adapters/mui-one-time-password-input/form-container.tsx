'use client';

import Stack from '@mui/material/Stack';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { MuiOtpInputElement } from '@piplup/rhf-adapters/mui-one-time-password-input';
import { FormContainer } from '@piplup/rhf-core';

export default function Page() {
  return (
    <FormContainer
      defaultValues={{ code: '' }}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
    >
      <Stack direction="column" spacing={2}>
        <MuiOtpInputElement length={6} name="code" />
        <div>
          <MuiButtonElement type="submit" variant="contained">
            Submit
          </MuiButtonElement>
        </div>
      </Stack>
    </FormContainer>
  );
}
