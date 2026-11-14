'use client';

import type * as React from 'react';

import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { MuiButtonElement, useMuiTextFieldAdapter } from '@piplup/rhf-adapters/mui-material';
import { useForm } from 'react-hook-form';

import type { Control } from 'react-hook-form';

type FormValues = { username: string };

// A username field that lowercases input as you type and enforces
// length and character rules with its own messages.
function UsernameField({ control }: { control: Control<FormValues> }) {
  const adapter = useMuiTextFieldAdapter<string, FormValues, 'username', HTMLDivElement>({
    composeHelperText: true,
    control,
    helperText: 'Letters, numbers and underscores',
    maxLength: 20,
    messages: {
      maxLength: 'Use 20 characters or fewer',
      minLength: 'Use at least 3 characters',
      pattern: 'Only letters, numbers and underscores are allowed',
      required: 'Choose a username',
    },
    minLength: 3,
    name: 'username',
    pattern: /^[a-z0-9_]+$/,
    required: true,
    transform: {
      output: (event: React.ChangeEvent<HTMLInputElement>) => event.target.value.toLowerCase(),
    },
  });

  return (
    <TextField
      {...adapter}
      slotProps={{
        input: {
          startAdornment: <InputAdornment position="start">@</InputAdornment>,
        },
      }}
      label="Username"
    />
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { username: '' },
  });

  return (
    <form onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))} noValidate>
      <Stack direction="column" spacing={2}>
        <UsernameField control={control} />
        <div>
          <MuiButtonElement control={control} type="submit" variant="contained">
            Create account
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
