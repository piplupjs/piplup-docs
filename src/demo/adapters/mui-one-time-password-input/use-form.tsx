'use client';

import Stack from '@mui/material/Stack';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { MuiOtpInputElement } from '@piplup/rhf-adapters/mui-one-time-password-input';
import { useForm } from 'react-hook-form';

export default function Page() {
  const { control, handleSubmit } = useForm({ defaultValues: { code: '' } });
  return (
    <form onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))}>
      <Stack direction="column" spacing={2}>
        <MuiOtpInputElement control={control} length={6} name="code" />
        <div>
          <MuiButtonElement control={control} type="submit" variant="contained">
            Submit
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
