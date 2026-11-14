'use client';

import * as React from 'react';

import FormHelperText from '@mui/material/FormHelperText';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {
  MuiButtonElement,
  useMuiFormHelperTextAdapter,
  useMuiInputBaseAdapter,
} from '@piplup/rhf-adapters/mui-material';
import { useForm } from 'react-hook-form';

import type { Control, FieldError } from 'react-hook-form';

type FormValues = { phone: string };

// An error-only helper text with its own formatting. It reads the field's
// error by name; the input itself does not render any helper text.
function PhoneError({ control, id }: { control: Control<FormValues>; id: string }) {
  const helper = useMuiFormHelperTextAdapter<FormValues, 'phone', HTMLParagraphElement>({
    composeHelperText: true,
    control,
    errorParser: (error) => {
      const message = (error as FieldError | undefined)?.message;
      return message ? <strong>{message}</strong> : null;
    },
    name: 'phone',
  });

  if (!helper.error) {
    return null;
  }

  return <FormHelperText {...helper} id={id} role="alert" />;
}

function PhoneField({ control }: { control: Control<FormValues> }) {
  const inputId = React.useId();
  const errorId = `${inputId}-error`;

  const { helperText, ref, ...input } = useMuiInputBaseAdapter({
    control,
    messages: {
      pattern: 'Use digits and spaces, with an optional leading +',
      required: 'Add a phone number so the courier can reach you',
    },
    name: 'phone',
    pattern: /^\+?[0-9 ]{7,15}$/,
    required: true,
    type: 'tel',
  });

  return (
    <Stack spacing={0.5}>
      <Typography component="label" htmlFor={inputId} variant="body2">
        Phone for delivery
      </Typography>
      <InputBase
        {...input}
        sx={{
          border: 1,
          borderColor: input.error ? 'error.main' : 'divider',
          borderRadius: 1,
          px: 1.5,
          py: 0.5,
        }}
        id={inputId}
        inputRef={ref}
        slotProps={{ input: { 'aria-describedby': errorId } }}
      />
      <PhoneError control={control} id={errorId} />
    </Stack>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { phone: '' },
  });

  return (
    <form onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))} noValidate>
      <Stack direction="column" spacing={2}>
        <PhoneField control={control} />
        <div>
          <MuiButtonElement control={control} type="submit" variant="contained">
            Continue
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
