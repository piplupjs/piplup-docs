"use client";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  MuiTextFieldElement,
  useMuiButtonAdapter,
} from "@piplup/rhf-adapters/mui-material";
import { type Control, useForm } from "react-hook-form";

type FormValues = { displayName: string; bio: string };

// Disabled while the submit handler runs. Because disableOnIsSubmitting is
// the only rule that can disable it, `disabled` also tells us we're saving.
function SaveButton({ control }: { control: Control<FormValues> }) {
  // Button has no error or helperText props, so keep them off the DOM.
  const {
    error: _error,
    helperText: _helperText,
    ...adapter
  } = useMuiButtonAdapter<FormValues, HTMLButtonElement>({
    control,
    type: "submit",
    disableOnIsSubmitting: true,
  });

  return (
    <Button variant="contained" {...adapter}>
      {adapter.disabled ? "Saving…" : "Save"}
    </Button>
  );
}

// Resets the form to its default values, but only after the user confirms.
// Calling preventDefault() in onClick stops the reset.
function DiscardButton({ control }: { control: Control<FormValues> }) {
  const {
    error: _error,
    helperText: _helperText,
    ...adapter
  } = useMuiButtonAdapter<FormValues, HTMLButtonElement>({
    control,
    type: "reset",
    disableOnIsSubmitting: true,
    onClick(event) {
      if (!window.confirm("Discard your changes?")) {
        event.preventDefault();
      }
    },
  });

  return (
    <Button variant="outlined" {...adapter}>
      Discard changes
    </Button>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { displayName: "Ada", bio: "" },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit(async (values) => {
        // Simulate a slow request so the disabled state is visible.
        await new Promise((resolve) => setTimeout(resolve, 1500));
        alert(JSON.stringify(values, null, 2));
      })}
    >
      <Stack direction="column" spacing={2}>
        <MuiTextFieldElement
          control={control}
          name="displayName"
          label="Display name"
          required
        />
        <MuiTextFieldElement
          control={control}
          name="bio"
          label="Bio"
          multiline
          minRows={2}
        />
        <Stack direction="row" spacing={1}>
          <SaveButton control={control} />
          <DiscardButton control={control} />
        </Stack>
      </Stack>
    </form>
  );
}
