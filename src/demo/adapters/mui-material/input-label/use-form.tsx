"use client";

import { useId } from "react";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import {
  MuiFormHelperTextElement,
  MuiOutlinedInputElement,
  MuiInputLabelElement,
  MuiButtonElement,
} from "@piplup/rhf-adapters/mui-material";
import { useForm } from "react-hook-form";

export default function Page() {
  const inputId = useId();
  const helperTextId = `${inputId}-helper-text`;

  const { control, handleSubmit } = useForm({ defaultValues: { email: "" } });

  return (
    <form
      onSubmit={handleSubmit((values) =>
        alert(JSON.stringify(values, null, 2)),
      )}
      noValidate
    >
      <Stack direction="column" spacing={2}>
        <FormControl variant="outlined">
          <MuiInputLabelElement
            control={control}
            name="email"
            htmlFor={inputId}
            sx={{ mb: 0.5 }}
          >
            Email
          </MuiInputLabelElement>
          <MuiOutlinedInputElement
            control={control}
            name="email"
            id={inputId}
            type="email"
            aria-describedby={helperTextId}
            required
          />
          <MuiFormHelperTextElement
            control={control}
            name="email"
            id={helperTextId}
            renderOnError
          />
        </FormControl>
        <div>
          <MuiButtonElement control={control} type="submit" variant="contained">
            Submit
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
