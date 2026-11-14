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
import { FormContainer } from '@piplup/rhf-core';

export default function Page() {
  const inputId = React.useId();
  const helperTextId = `${inputId}-helper-text`;

  return (
    <FormContainer
      defaultValues={{ email: '' }}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
    >
      <Stack direction="column" spacing={2}>
        <FormControl variant="outlined">
          <MuiFormLabelElement htmlFor={inputId} name="email">
            Email
          </MuiFormLabelElement>
          <MuiInputElement
            aria-describedby={helperTextId}
            id={inputId}
            name="email"
            type="email"
            required
          />
          <MuiFormHelperTextElement id={helperTextId} name="email" renderOnError />
        </FormControl>
        <div>
          <MuiButtonElement type="submit" variant="contained">
            Submit
          </MuiButtonElement>
        </div>
      </Stack>
    </FormContainer>
  );
}
