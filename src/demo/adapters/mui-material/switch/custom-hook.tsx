'use client';

import type * as React from 'react';

import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import { MuiButtonElement, useMuiSwitchAdapter } from '@piplup/rhf-adapters/mui-material';
import { useForm } from 'react-hook-form';

import type { Control } from 'react-hook-form';

type FormValues = {
  newsletter: 'subscribed' | 'unsubscribed';
  terms: boolean;
};

// A switch that must be on. `false` fails the `required` rule.
function TermsSwitch({ control }: { control: Control<FormValues> }) {
  const { error, helperText, ...adapter } = useMuiSwitchAdapter<boolean, FormValues, 'terms'>({
    composeHelperText: true,
    control,
    messages: { required: 'You need to accept the terms to continue' },
    name: 'terms',
    required: true,
  });

  return (
    <div>
      <FormControlLabel control={<Switch {...adapter} />} label="I accept the terms of service" />
      {error && <FormHelperText error>{helperText}</FormHelperText>}
    </div>
  );
}

// A switch that stores a string instead of a boolean.
function NewsletterSwitch({ control }: { control: Control<FormValues> }) {
  const { error, helperText, ...adapter } = useMuiSwitchAdapter<boolean, FormValues, 'newsletter'>({
    control,
    name: 'newsletter',
    transform: {
      input: (value) => value === 'subscribed',
      output: (event: React.ChangeEvent<HTMLInputElement>) =>
        event.target.checked ? 'subscribed' : 'unsubscribed',
    },
  });

  return (
    <FormControlLabel control={<Switch {...adapter} />} label="Send me the monthly newsletter" />
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { newsletter: 'unsubscribed', terms: false },
  });

  return (
    <form onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))} noValidate>
      <Stack direction="column" spacing={1}>
        <TermsSwitch control={control} />
        <NewsletterSwitch control={control} />
        <div>
          <MuiButtonElement control={control} type="submit" variant="contained">
            Continue
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
