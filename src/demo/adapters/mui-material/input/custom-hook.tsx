'use client';

import * as React from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import { MuiButtonElement, useMuiInputAdapterProps } from '@piplup/rhf-adapters/mui-material';
import { useForm } from 'react-hook-form';

import type { Control } from 'react-hook-form';

type FormValues = { email: string };

// The field does not set `required` or `disabled` itself. It picks both up
// from the surrounding FormControl, and type="email" adds an email check.
function EmailInput({ control }: { control: Control<FormValues> }) {
  const { helperText, ref, ...adapter } = useMuiInputAdapterProps({
    composeHelperText: true,
    control,
    messages: { required: 'We need an email to send the receipt' },
    name: 'email',
    type: 'email',
  });

  // FormControl does not know about the field error, so pass it to the
  // label and helper text directly.
  return (
    <React.Fragment>
      <InputLabel error={adapter.error}>Email</InputLabel>
      <Input {...adapter} inputRef={ref} />
      <FormHelperText error={adapter.error}>{helperText}</FormHelperText>
    </React.Fragment>
  );
}

export default function Page() {
  const [sendReceipt, setSendReceipt] = React.useState(true);
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { email: '' },
  });

  return (
    <form onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))} noValidate>
      <Stack direction="column" spacing={2}>
        <FormControlLabel
          control={
            <Checkbox
              checked={sendReceipt}
              onChange={(event) => setSendReceipt(event.target.checked)}
            />
          }
          label="Email me a receipt"
        />
        <FormControl disabled={!sendReceipt} required={sendReceipt} variant="standard">
          <EmailInput control={control} />
        </FormControl>
        <div>
          <MuiButtonElement control={control} type="submit" variant="contained">
            Pay
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
