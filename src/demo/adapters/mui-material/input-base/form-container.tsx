"use client";

import { useId } from "react";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import {
  MuiFormHelperTextElement,
  MuiInputBaseElement,
  MuiFormLabelElement,
  MuiButtonElement,
} from "@piplup/rhf-adapters/mui-material";
import { FormContainer } from "@piplup/rhf-core";

export default function Page() {
  const inputId = useId();
  const helperTextId = `${inputId}-helper-text`;

  return (
    <FormContainer
      defaultValues={{ email: "" }}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
    >
      <Stack direction="column" spacing={2}>
        <FormControl variant="outlined">
          <MuiFormLabelElement
            name="email"
            htmlFor={inputId}
            sx={{ mb: 0.5 }}
          >
            Email
          </MuiFormLabelElement>
          <MuiInputBaseElement
            name="email"
            id={inputId}
            type="email"
            aria-describedby={helperTextId}
            required
          />
          <MuiFormHelperTextElement
            name="email"
            id={helperTextId}
            renderOnError
          />
        </FormControl>
        <div>
          <MuiButtonElement type="submit" variant="contained">
            Submit
          </MuiButtonElement>
        </div>
      </Stack>
    </FormContainer>
  );
}