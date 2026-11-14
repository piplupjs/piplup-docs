'use client';

import * as React from 'react';

import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import {
  MuiFormHelperTextElement,
  MuiInputElement,
  MuiFormLabelElement,
  MuiButtonElement,
} from '@piplup/rhf-adapters/mui-material';
import { useForm } from 'react-hook-form';

export default function Page() {
  const inputId = React.useId();
  const helperTextId = `${inputId}-helper-text`;

  const { control, handleSubmit } = useForm({ defaultValues: { email: '' } });

  return (
    <form onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))} noValidate>
      <Stack direction="column" spacing={2}>
        <FormControl variant="outlined">
          <MuiFormLabelElement control={control} htmlFor={inputId} name="email">
            Email
          </MuiFormLabelElement>
          <MuiInputElement
            aria-describedby={helperTextId}
            control={control}
            id={inputId}
            name="email"
            type="email"
            required
          />
          <MuiFormHelperTextElement
            control={control}
            id={helperTextId}
            name="email"
            renderOnError
          />
        </FormControl>
        <div>
          <MuiButtonElement control={control} type="submit" variant="contained">
            Submit
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
