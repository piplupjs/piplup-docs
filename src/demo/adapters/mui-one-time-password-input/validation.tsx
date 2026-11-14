'use client';

import Stack from '@mui/material/Stack';
import { MuiButtonElement, MuiFormHelperTextElement } from '@piplup/rhf-adapters/mui-material';
import { MuiOtpInputElement } from '@piplup/rhf-adapters/mui-one-time-password-input';
import { useForm } from 'react-hook-form';

export default function Page() {
  const { control, handleSubmit } = useForm({ defaultValues: { code: '' } });

  return (
    <form onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))} noValidate>
      <Stack direction="column" spacing={1}>
        <MuiOtpInputElement
          messages={{
            minLength: 'Enter all 6 digits',
            required: 'Enter the code we sent you',
          }}
          control={control}
          length={6}
          // A partly filled code is not empty, so `required` alone lets it through.
          minLength={6}
          name="code"
          // Ignore anything that isn't a digit, including pasted text.
          validateChar={(character) => /^\d$/.test(character)}
          required
        />
        {/* The OTP input has no helper text, so render the error message here. */}
        <MuiFormHelperTextElement control={control} name="code">
          We sent a 6-digit code to your email
        </MuiFormHelperTextElement>
        <div>
          <MuiButtonElement control={control} type="submit" variant="contained">
            Verify
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
