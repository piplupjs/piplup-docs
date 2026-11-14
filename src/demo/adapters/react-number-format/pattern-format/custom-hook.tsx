'use client';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { usePatternFormatAdapter } from '@piplup/rhf-adapters/react-number-format';
import { useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

import type { Control } from 'react-hook-form';

type FormValues = { phone: string };

// The form stores only the 10 typed digits, so the rules below
// run against "2125550100", not "+1 (212) 555-0100".
function UsPhoneField({ control }: { control: Control<FormValues> }) {
  const adapter = usePatternFormatAdapter<string, FormValues, 'phone'>({
    composeHelperText: true,
    control,
    messages: {
      pattern: 'Enter all 10 digits',
      required: 'Enter a phone number',
    },
    name: 'phone',
    pattern: /^\d{10}$/,
    required: true,
    rules: {
      validate: (value) => !/^[01]/.test(value) || "Area codes can't start with 0 or 1",
    },
  });

  return (
    <PatternFormat
      customInput={TextField}
      format="+1 (###) ###-####"
      label="Mobile number"
      mask="_"
      {...adapter}
    />
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { phone: '' },
  });

  return (
    <form onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))} noValidate>
      <Stack direction="column" spacing={2}>
        <UsPhoneField control={control} />
        <div>
          <MuiButtonElement control={control} type="submit" variant="contained">
            Submit
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
