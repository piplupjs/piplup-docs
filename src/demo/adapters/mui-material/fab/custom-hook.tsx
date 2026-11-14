'use client';

import SendIcon from '@mui/icons-material/Send';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import { MuiTextFieldElement, useMuiFabAdapter } from '@piplup/rhf-adapters/mui-material';
import { useForm } from 'react-hook-form';

import type { Control } from 'react-hook-form';

type FormValues = { message: string };

// Stays clickable while the form is invalid, so submitting shows the
// validation errors, but `style` dims it to hint that something is missing.
// It is disabled only while the submit handler runs.
function SendFab({ control }: { control: Control<FormValues> }) {
  // Fab has no error or helperText props, so keep them off the DOM.
  const { error, helperText, ...adapter } = useMuiFabAdapter<FormValues, HTMLButtonElement>({
    control,
    disableOnIsSubmitting: true,
    style: ({ error }) => ({ opacity: error ? 0.6 : 1 }),
    type: 'submit',
  });

  return (
    <Fab color="primary" variant="extended" {...adapter}>
      <SendIcon sx={{ mr: 1 }} />
      Send
    </Fab>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { message: '' },
  });

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        // Simulate a slow request so the disabled state is visible.
        await new Promise((resolve) => {
          setTimeout(resolve, 1500);
        });
        alert(JSON.stringify(values, null, 2));
      })}
      noValidate
    >
      <Stack direction="column" spacing={2} sx={{ alignItems: 'flex-start' }}>
        <MuiTextFieldElement
          control={control}
          label="Message"
          minRows={3}
          name="message"
          fullWidth
          multiline
          required
        />
        <SendFab control={control} />
      </Stack>
    </form>
  );
}
