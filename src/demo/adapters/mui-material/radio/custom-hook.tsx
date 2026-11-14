'use client';

import type * as React from 'react';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import { MuiButtonElement, useMuiRadioAdapter } from '@piplup/rhf-adapters/mui-material';
import { useForm, useFormState } from 'react-hook-form';

import type { Control } from 'react-hook-form';

type FormValues = { seats: null | number };

const SEAT_OPTIONS = [1, 2, 4];

// One radio. It inherits `required` from the surrounding FormControl, and
// stores a number instead of the string the DOM gives back.
function SeatOption({ control, seats }: { control: Control<FormValues>; seats: number }) {
  // Radio has no error or helperText props, so keep them off the DOM.
  // `required` is dropped too, or FormControlLabel would put an asterisk on
  // every option. The legend already shows one.
  const { error, helperText, required, ...adapter } = useMuiRadioAdapter<
    unknown,
    FormValues,
    'seats',
    HTMLButtonElement
  >({
    control,
    messages: { required: 'Choose how many seats you need' },
    name: 'seats',
    transform: {
      output: (event: React.ChangeEvent<HTMLInputElement>) => Number(event.target.value),
    },
    value: seats,
  });

  return (
    <FormControlLabel
      control={<Radio {...adapter} />}
      label={seats === 1 ? '1 seat' : `${seats} seats`}
    />
  );
}

function SeatsField({ control }: { control: Control<FormValues> }) {
  const { errors } = useFormState({ control, name: 'seats' });
  const message = errors.seats?.message;

  return (
    <FormControl component="fieldset" error={!!message} required>
      <FormLabel component="legend">Seats</FormLabel>
      {/* A FormGroup, not a RadioGroup: each radio is wired to the form itself. */}
      <FormGroup row>
        {SEAT_OPTIONS.map((seats) => (
          <SeatOption control={control} key={seats} seats={seats} />
        ))}
      </FormGroup>
      {message ? <FormHelperText>{message}</FormHelperText> : null}
    </FormControl>
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
