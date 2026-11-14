'use client';

import * as React from 'react';

import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import { MuiButtonElement, useMuiFilledInputAdapter } from '@piplup/rhf-adapters/mui-material';
import { useForm } from 'react-hook-form';

import type { Control } from 'react-hook-form';

type FormValues = { website: string };

// type="url" alone does not validate anything. The pattern does, and the
// message has to be set explicitly once a pattern is passed.
function WebsiteField({ control }: { control: Control<FormValues> }) {
  const id = React.useId();
  const { helperText, ref, ...adapter } = useMuiFilledInputAdapter({
    composeHelperText: true,
    control,
    helperText: 'Optional. Must start with https://',
    messages: {
      pattern: 'Enter a full https:// address',
    },
    name: 'website',
    pattern: /^https:\/\/\S+\.\S+$/,
    transform: {
      output: (event: React.ChangeEvent<HTMLInputElement>) => event.target.value.trim(),
    },
    type: 'url',
  });

  return (
    <FormControl error={adapter.error} variant="filled">
      <InputLabel htmlFor={id}>Website</InputLabel>
      <FilledInput {...adapter} id={id} inputRef={ref} placeholder="https://example.com" />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { website: '' },
  });

  return (
    <form onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))} noValidate>
      <Stack direction="column" spacing={2}>
        <WebsiteField control={control} />
        <div>
          <MuiButtonElement control={control} type="submit" variant="contained">
            Save profile
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
