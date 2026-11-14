'use client';

import * as React from 'react';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import { MuiButtonElement, useMuiOutlinedInputAdapter } from '@piplup/rhf-adapters/mui-material';
import { useForm } from 'react-hook-form';

import type { Control } from 'react-hook-form';

type FormValues = { password: string };

// A password field with a show/hide toggle. The input type is passed to the
// hook, not to OutlinedInput, because the adapter returns its own `type`.
function PasswordField({ control }: { control: Control<FormValues> }) {
  const id = React.useId();
  const [visible, setVisible] = React.useState(false);
  const { helperText, ref, ...adapter } = useMuiOutlinedInputAdapter({
    composeHelperText: true,
    control,
    helperText: 'At least 8 characters',
    maxLength: 64,
    messages: {
      minLength: (length) => `Use at least ${length} characters`,
      required: 'Choose a password',
    },
    minLength: 8,
    name: 'password',
    required: true,
    type: visible ? 'text' : 'password',
  });

  return (
    <FormControl error={adapter.error} variant="outlined" required>
      <InputLabel htmlFor={id}>Password</InputLabel>
      <OutlinedInput
        {...adapter}
        endAdornment={
          <InputAdornment position="end">
            <Button onClick={() => setVisible((v) => !v)} size="small">
              {visible ? 'Hide' : 'Show'}
            </Button>
          </InputAdornment>
        }
        autoComplete="new-password"
        id={id}
        inputRef={ref}
        label="Password"
      />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { password: '' },
  });

  return (
    <form onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))} noValidate>
      <Stack direction="column" spacing={2}>
        <PasswordField control={control} />
        <div>
          <MuiButtonElement control={control} type="submit" variant="contained">
            Set password
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
