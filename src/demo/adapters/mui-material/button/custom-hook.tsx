'use client';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { MuiTextFieldElement, useMuiButtonAdapter } from '@piplup/rhf-adapters/mui-material';
import { useForm } from 'react-hook-form';

import type { Control } from 'react-hook-form';

type FormValues = { bio: string; displayName: string };

// Disabled while the submit handler runs. Because disableOnIsSubmitting is
// the only rule that can disable it, `disabled` also tells us we're saving.
function SaveButton({ control }: { control: Control<FormValues> }) {
  // Button has no error or helperText props, so keep them off the DOM.
  const { error, helperText, ...adapter } = useMuiButtonAdapter<FormValues, HTMLButtonElement>({
    control,
    disableOnIsSubmitting: true,
    type: 'submit',
  });

  return (
    <Button variant="contained" {...adapter}>
      {adapter.disabled ? 'Saving…' : 'Save'}
    </Button>
  );
}

// Resets the form to its default values, but only after the user confirms.
// Calling preventDefault() in onClick stops the reset.
function DiscardButton({ control }: { control: Control<FormValues> }) {
  const { error, helperText, ...adapter } = useMuiButtonAdapter<FormValues, HTMLButtonElement>({
    control,
    disableOnIsSubmitting: true,
    onClick(event) {
      if (!window.confirm('Discard your changes?')) {
        event.preventDefault();
      }
    },
    type: 'reset',
  });

  return (
    <Button variant="outlined" {...adapter}>
      Discard changes
    </Button>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { bio: '', displayName: 'Ada' },
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
      <Stack direction="column" spacing={2}>
        <MuiTextFieldElement control={control} label="Display name" name="displayName" required />
        <MuiTextFieldElement control={control} label="Bio" minRows={2} name="bio" multiline />
        <Stack direction="row" spacing={1}>
          <SaveButton control={control} />
          <DiscardButton control={control} />
        </Stack>
      </Stack>
    </form>
  );
}
