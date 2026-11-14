'use client';

import type * as React from 'react';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import { MuiButtonElement, useMuiRadioGroupAdapter } from '@piplup/rhf-adapters/mui-material';
import { useForm } from 'react-hook-form';

import type { Control } from 'react-hook-form';

type FormValues = { giftWrap: boolean | null };

// A yes/no question stored as a real boolean. The radios work with the
// strings "true" and "false"; the transform converts in both directions.
function GiftWrapField({ control }: { control: Control<FormValues> }) {
  const { error, helperText, ...adapter } = useMuiRadioGroupAdapter<
    null | string,
    FormValues,
    'giftWrap',
    HTMLDivElement
  >({
    composeHelperText: true,
    control,
    name: 'giftWrap',
    // Not `required`: React Hook Form treats `false` as missing.
    rules: {
      validate: (value) => value !== null || 'Choose yes or no',
    },
    transform: {
      input: (value) => (typeof value === 'boolean' ? String(value) : null),
      output: (_event: React.ChangeEvent<HTMLInputElement>, value: string) => value === 'true',
    },
  });

  return (
    <FormControl error={error}>
      <FormLabel id="gift-wrap-label">Gift wrap this order?</FormLabel>
      <RadioGroup aria-labelledby="gift-wrap-label" row {...adapter}>
        <FormControlLabel control={<Radio />} label="Yes" value="true" />
        <FormControlLabel control={<Radio />} label="No" value="false" />
      </RadioGroup>
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { giftWrap: null },
  });

  return (
    <form onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))} noValidate>
      <Stack direction="column" spacing={2}>
        <GiftWrapField control={control} />
        <div>
          <MuiButtonElement control={control} type="submit" variant="contained">
            Continue
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
