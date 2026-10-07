"use client";

import type { ChangeEvent } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import {
  MuiButtonElement,
  useMuiTextFieldAdapter,
} from "@piplup/rhf-adapters/mui-material";
import { type Control, useForm } from "react-hook-form";

type FormValues = { username: string };

// A username field that lowercases input as you type and enforces
// length and character rules with its own messages.
function UsernameField({ control }: { control: Control<FormValues> }) {
  const adapter = useMuiTextFieldAdapter<
    string,
    FormValues,
    "username",
    HTMLDivElement
  >({
    control,
    name: "username",
    required: true,
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-z0-9_]+$/,
    composeHelperText: true,
    helperText: "Letters, numbers and underscores",
    messages: {
      required: "Choose a username",
      minLength: "Use at least 3 characters",
      maxLength: "Use 20 characters or fewer",
      pattern: "Only letters, numbers and underscores are allowed",
    },
    transform: {
      output: (event: ChangeEvent<HTMLInputElement>) =>
        event.target.value.toLowerCase(),
    },
  });

  return (
    <TextField
      {...adapter}
      label="Username"
      slotProps={{
        input: {
          startAdornment: <InputAdornment position="start">@</InputAdornment>,
        },
      }}
    />
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { username: "" },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) =>
        alert(JSON.stringify(values, null, 2)),
      )}
    >
      <Stack direction="column" spacing={2}>
        <UsernameField control={control} />
        <div>
          <MuiButtonElement control={control} variant="contained" type="submit">
            Create account
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
