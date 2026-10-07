"use client";

import { useId } from "react";
import Stack from "@mui/material/Stack";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import InputBase from "@mui/material/InputBase";
import {
  MuiButtonElement,
  useMuiFormHelperTextAdapter,
  useMuiFormLabelAdapter,
  useMuiInputBaseAdapter,
} from "@piplup/rhf-adapters/mui-material";
import { type Control, useForm } from "react-hook-form";

type FormValues = { bio: string };

// A field built from three hooks. Only the input registers the value.
// The label and helper text read the same field's error state by name.
function BioField({ control }: { control: Control<FormValues> }) {
  const inputId = useId();
  const helperId = `${inputId}-helper`;

  const {
    ref,
    helperText: _inputHelperText,
    ...input
  } = useMuiInputBaseAdapter({
    control,
    name: "bio",
    required: true,
    maxLength: 160,
    messages: {
      required: "Tell us a little about yourself",
      maxLength: (max) => `Keep it under ${max} characters`,
    },
  });

  const { helperText: _labelHelperText, ...label } = useMuiFormLabelAdapter<
    FormValues,
    "bio",
    HTMLLabelElement
  >({
    control,
    name: "bio",
  });

  const helper = useMuiFormHelperTextAdapter<
    FormValues,
    "bio",
    HTMLParagraphElement
  >({
    control,
    name: "bio",
    composeHelperText: true,
    children: "Shown on your public profile",
  });

  return (
    <Stack spacing={0.5}>
      <FormLabel {...label} htmlFor={inputId} required>
        Bio
      </FormLabel>
      <InputBase
        {...input}
        id={inputId}
        inputRef={ref}
        multiline
        minRows={3}
        slotProps={{ input: { "aria-describedby": helperId } }}
        sx={{
          p: 1,
          border: 1,
          borderRadius: 1,
          borderColor: input.error ? "error.main" : "divider",
        }}
      />
      <FormHelperText {...helper} id={helperId} />
    </Stack>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { bio: "" },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) =>
        alert(JSON.stringify(values, null, 2)),
      )}
    >
      <Stack direction="column" spacing={2}>
        <BioField control={control} />
        <div>
          <MuiButtonElement control={control} variant="contained" type="submit">
            Save
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
