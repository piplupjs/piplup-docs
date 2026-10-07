"use client";

import { useId } from "react";
import Stack from "@mui/material/Stack";
import FormHelperText from "@mui/material/FormHelperText";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import {
  MuiButtonElement,
  useMuiFormHelperTextAdapter,
  useMuiInputBaseAdapter,
} from "@piplup/rhf-adapters/mui-material";
import { type Control, type FieldError, useForm } from "react-hook-form";

type FormValues = { phone: string };

// An error-only helper text with its own formatting. It reads the field's
// error by name; the input itself does not render any helper text.
function PhoneError({ control, id }: { control: Control<FormValues>; id: string }) {
  const helper = useMuiFormHelperTextAdapter<
    FormValues,
    "phone",
    HTMLParagraphElement
  >({
    control,
    name: "phone",
    composeHelperText: true,
    errorParser: (error) => {
      const message = (error as FieldError | undefined)?.message;
      return message ? <strong>{message}</strong> : null;
    },
  });

  if (!helper.error) {
    return null;
  }

  return <FormHelperText {...helper} id={id} role="alert" />;
}

function PhoneField({ control }: { control: Control<FormValues> }) {
  const inputId = useId();
  const errorId = `${inputId}-error`;

  const { ref, helperText: _helperText, ...input } = useMuiInputBaseAdapter({
    control,
    name: "phone",
    type: "tel",
    required: true,
    pattern: /^\+?[0-9 ]{7,15}$/,
    messages: {
      required: "Add a phone number so the courier can reach you",
      pattern: "Use digits and spaces, with an optional leading +",
    },
  });

  return (
    <Stack spacing={0.5}>
      <Typography component="label" htmlFor={inputId} variant="body2">
        Phone for delivery
      </Typography>
      <InputBase
        {...input}
        id={inputId}
        inputRef={ref}
        slotProps={{ input: { "aria-describedby": errorId } }}
        sx={{
          px: 1.5,
          py: 0.5,
          border: 1,
          borderRadius: 1,
          borderColor: input.error ? "error.main" : "divider",
        }}
      />
      <PhoneError control={control} id={errorId} />
    </Stack>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { phone: "" },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) =>
        alert(JSON.stringify(values, null, 2)),
      )}
    >
      <Stack direction="column" spacing={2}>
        <PhoneField control={control} />
        <div>
          <MuiButtonElement control={control} variant="contained" type="submit">
            Continue
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
