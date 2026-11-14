'use client';

import * as React from 'react';

import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MuiButtonElement, useMuiInputBaseAdapter } from '@piplup/rhf-adapters/mui-material';
import { useForm } from 'react-hook-form';

import type { Control } from 'react-hook-form';

type FormValues = { seats: null | number };

// A borderless number field. The form stores a number (or null when empty),
// and the hook adds min/max rules with custom messages.
function SeatsField({ control }: { control: Control<FormValues> }) {
  const id = React.useId();
  const { error, helperText, ref, ...adapter } = useMuiInputBaseAdapter({
    composeHelperText: true,
    control,
    helperText: 'Between 1 and 8 seats per booking',
    max: 8,
    messages: {
      max: (max) => `Groups larger than ${max} need to call us`,
      min: 'Book at least one seat',
      required: 'How many seats do you need?',
    },
    min: 1,
    name: 'seats',
    required: true,
    transform: {
      // An empty number field is stored as null. Give the input an empty
      // string instead so it stays controlled.
      input: (value) => value ?? '',
    },
    type: 'number',
  });

  return (
    <Stack spacing={0.5}>
      <Typography component="label" htmlFor={id} variant="body2">
        Seats
      </Typography>
      <InputBase
        {...adapter}
        sx={{
          bgcolor: 'action.hover',
          borderRadius: 1,
          maxWidth: 200,
          outline: error ? '2px solid' : 'none',
          outlineColor: 'error.main',
          px: 1.5,
          py: 0.5,
        }}
        error={error}
        id={id}
        inputRef={ref}
        slotProps={{ input: { max: 8, min: 1 } }}
      />
      <Typography color={error ? 'error' : 'text.secondary'} variant="caption">
        {helperText}
      </Typography>
    </Stack>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { seats: null },
  });

  return (
    <form onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))} noValidate>
      <Stack direction="column" spacing={2}>
        <SeatsField control={control} />
        <div>
          <MuiButtonElement control={control} type="submit" variant="contained">
            Book
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
