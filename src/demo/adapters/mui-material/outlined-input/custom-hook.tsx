"use client";

import { useId, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import {
  MuiButtonElement,
  useMuiOutlinedInputAdapter,
} from "@piplup/rhf-adapters/mui-material";
import { type Control, useForm } from "react-hook-form";

type FormValues = { password: string };

// A password field with a show/hide toggle. The input type is passed to the
// hook, not to OutlinedInput, because the adapter returns its own `type`.
function PasswordField({ control }: { control: Control<FormValues> }) {
  const id = useId();
  const [visible, setVisible] = useState(false);
  const { ref, helperText, ...adapter } = useMuiOutlinedInputAdapter({
    control,
    name: "password",
    type: visible ? "text" : "password",
    required: true,
    minLength: 8,
    maxLength: 64,
    composeHelperText: true,
    helperText: "At least 8 characters",
    messages: {
      required: "Choose a password",
      minLength: (length) => `Use at least ${length} characters`,
    },
  });

  return (
    <FormControl variant="outlined" error={adapter.error} required>
      <InputLabel htmlFor={id}>Password</InputLabel>
      <OutlinedInput
        {...adapter}
        id={id}
        inputRef={ref}
        label="Password"
        autoComplete="new-password"
        endAdornment={
          <InputAdornment position="end">
            <Button size="small" onClick={() => setVisible((v) => !v)}>
              {visible ? "Hide" : "Show"}
            </Button>
          </InputAdornment>
        }
      />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { password: "" },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) =>
        alert(JSON.stringify(values, null, 2)),
      )}
    >
      <Stack direction="column" spacing={2}>
        <PasswordField control={control} />
        <div>
          <MuiButtonElement control={control} variant="contained" type="submit">
            Set password
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
