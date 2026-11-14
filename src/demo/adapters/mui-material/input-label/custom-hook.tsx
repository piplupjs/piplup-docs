'use client';

import * as React from 'react';

import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import {
  MuiButtonElement,
  useMuiInputAdapterProps,
  useMuiInputLabelAdapter,
} from '@piplup/rhf-adapters/mui-material';
import { useForm } from 'react-hook-form';

import type { Control } from 'react-hook-form';

type FormValues = { promoCode: string };

// The floating label turns red when the promo code is invalid. The label
// hook does not register anything; it only reads the field's error.
function PromoCodeField({ control }: { control: Control<FormValues> }) {
  const id = React.useId();

  const { helperText: labelHelperText, ...label } = useMuiInputLabelAdapter<
    FormValues,
    'promoCode',
    HTMLLabelElement
  >({
    control,
    name: 'promoCode',
  });

  const { helperText, ref, ...input } = useMuiInputAdapterProps({
    composeHelperText: true,
    control,
    helperText: 'Optional, e.g. SAVE-2024',
    messages: { pattern: 'Codes look like SAVE-2024' },
    name: 'promoCode',
    pattern: /^[A-Z]{4}-\d{4}$/,
    transform: {
      output: (event: React.ChangeEvent<HTMLInputElement>) => event.target.value.toUpperCase(),
    },
  });

  return (
    <FormControl variant="standard">
      <InputLabel {...label} htmlFor={id}>
        Promo code
      </InputLabel>
      <Input {...input} id={id} inputRef={ref} />
      <FormHelperText error={input.error}>{helperText}</FormHelperText>
    </FormControl>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { promoCode: '' },
  });

  return (
    <form onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))} noValidate>
      <Stack direction="column" spacing={2}>
        <PromoCodeField control={control} />
        <div>
          <MuiButtonElement control={control} type="submit" variant="contained">
            Apply
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
