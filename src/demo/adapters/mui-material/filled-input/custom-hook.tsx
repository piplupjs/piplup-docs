"use client";

import { type ChangeEvent, useId } from "react";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import {
  MuiButtonElement,
  useMuiFilledInputAdapter,
} from "@piplup/rhf-adapters/mui-material";
import { type Control, useForm } from "react-hook-form";

type FormValues = { website: string };

// type="url" alone does not validate anything. The pattern does, and the
// message has to be set explicitly once a pattern is passed.
function WebsiteField({ control }: { control: Control<FormValues> }) {
  const id = useId();
  const { ref, helperText, ...adapter } = useMuiFilledInputAdapter({
    control,
    name: "website",
    type: "url",
    pattern: /^https:\/\/\S+\.\S+$/,
    composeHelperText: true,
    helperText: "Optional. Must start with https://",
    messages: {
      pattern: "Enter a full https:// address",
    },
    transform: {
      output: (event: ChangeEvent<HTMLInputElement>) =>
        event.target.value.trim(),
    },
  });

  return (
    <FormControl variant="filled" error={adapter.error}>
      <InputLabel htmlFor={id}>Website</InputLabel>
      <FilledInput
        {...adapter}
        id={id}
        inputRef={ref}
        placeholder="https://example.com"
      />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { website: "" },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) =>
        alert(JSON.stringify(values, null, 2)),
      )}
    >
      <Stack direction="column" spacing={2}>
        <WebsiteField control={control} />
        <div>
          <MuiButtonElement control={control} variant="contained" type="submit">
            Save profile
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
