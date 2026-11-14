'use client';

import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import { MuiButtonElement, MuiRadioGroupElement } from '@piplup/rhf-adapters/mui-material';
import { useForm } from 'react-hook-form';

export default function Page() {
  const { control, handleSubmit } = useForm({
    defaultValues: { plan: 'starter', role: 'user' },
  });

  return (
    <form onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))}>
      <Stack direction="column" spacing={2}>
        <MuiRadioGroupElement control={control} name="plan">
          <FormControlLabel control={<Radio />} label="Starter" value="starter" />
          <FormControlLabel control={<Radio />} label="Pro" value="pro" />
        </MuiRadioGroupElement>
        <div>
          <MuiButtonElement control={control} type="submit" variant="contained">
            Submit
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
