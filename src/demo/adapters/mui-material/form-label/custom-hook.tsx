'use client';

import * as React from 'react';

import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
import {
  MuiButtonElement,
  useMuiFormHelperTextAdapter,
  useMuiFormLabelAdapter,
  useMuiInputBaseAdapter,
} from '@piplup/rhf-adapters/mui-material';
import { useForm } from 'react-hook-form';

import type { Control } from 'react-hook-form';

type FormValues = { bio: string };

// A field built from three hooks. Only the input registers the value.
// The label and helper text read the same field's error state by name.
function BioField({ control }: { control: Control<FormValues> }) {
  const inputId = React.useId();
  const helperId = `${inputId}-helper`;

  const {
    helperText: inputHelperText,
    ref,
    ...input
  } = useMuiInputBaseAdapter({
    control,
    maxLength: 160,
    messages: {
      maxLength: (max) => `Keep it under ${max} characters`,
      required: 'Tell us a little about yourself',
    },
    name: 'bio',
    required: true,
  });

  const { helperText: labelHelperText, ...label } = useMuiFormLabelAdapter<
    FormValues,
    'bio',
    HTMLLabelElement
  >({
    control,
    name: 'bio',
  });

  const helper = useMuiFormHelperTextAdapter<FormValues, 'bio', HTMLParagraphElement>({
    children: 'Shown on your public profile',
    composeHelperText: true,
    control,
    name: 'bio',
  });

  return (
    <Stack spacing={0.5}>
      <FormLabel {...label} htmlFor={inputId} required>
        Bio
      </FormLabel>
      <InputBase
        {...input}
        sx={{
          border: 1,
          borderColor: input.error ? 'error.main' : 'divider',
          borderRadius: 1,
          p: 1,
        }}
        id={inputId}
        inputRef={ref}
        minRows={3}
        slotProps={{ input: { 'aria-describedby': helperId } }}
        multiline
      />
      <FormHelperText {...helper} id={helperId} />
    </Stack>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { bio: '' },
  });

  return (
    <form onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))} noValidate>
      <Stack direction="column" spacing={2}>
        <BioField control={control} />
        <div>
          <MuiButtonElement control={control} type="submit" variant="contained">
            Save
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
