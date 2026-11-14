'use client';

import Stack from '@mui/material/Stack';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { PatternFormatElement } from '@piplup/rhf-adapters/react-number-format';
import { FormContainer } from '@piplup/rhf-core';

export default function Page() {
  return (
    <FormContainer
      defaultValues={{ card: '4242424242424242' }}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
    >
      <Stack direction="column" spacing={2}>
        <PatternFormatElement format="#### #### #### ####" mask="_" name="card" />
        <div>
          <MuiButtonElement type="submit" variant="contained">
            Submit
          </MuiButtonElement>
        </div>
      </Stack>
    </FormContainer>
  );
}
