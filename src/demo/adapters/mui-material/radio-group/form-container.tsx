'use client';

import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import { MuiButtonElement, MuiRadioGroupElement } from '@piplup/rhf-adapters/mui-material';
import { FormContainer } from '@piplup/rhf-core';

export default function Page() {
  return (
    <FormContainer
      defaultValues={{ plan: 'starter', role: 'user' }}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
    >
      <Stack direction="column" spacing={2}>
        <MuiRadioGroupElement name="plan">
          <FormControlLabel control={<Radio />} label="Starter" value="starter" />
          <FormControlLabel control={<Radio />} label="Pro" value="pro" />
        </MuiRadioGroupElement>
        <div>
          <MuiButtonElement type="submit" variant="contained">
            Submit
          </MuiButtonElement>
        </div>
      </Stack>
    </FormContainer>
  );
}
