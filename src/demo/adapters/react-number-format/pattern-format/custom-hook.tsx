"use client";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { usePatternFormatAdapter } from "@piplup/rhf-adapters/react-number-format";
import { type Control, useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";

type FormValues = { phone: string };

// The form stores only the 10 typed digits, so the rules below
// run against "2125550100", not "+1 (212) 555-0100".
function UsPhoneField({ control }: { control: Control<FormValues> }) {
  const adapter = usePatternFormatAdapter<string, FormValues, "phone">({
    control,
    name: "phone",
    required: true,
    composeHelperText: true,
    pattern: /^\d{10}$/,
    messages: {
      required: "Enter a phone number",
      pattern: "Enter all 10 digits",
    },
    rules: {
      validate: (value) => !/^[01]/.test(value) || "Area codes can't start with 0 or 1",
    },
  });

  return (
    <PatternFormat
      customInput={TextField}
      label="Mobile number"
      format="+1 (###) ###-####"
      mask="_"
      {...adapter}
    />
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { phone: "" },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))}
    >
      <Stack direction="column" spacing={2}>
        <UsPhoneField control={control} />
        <div>
          <MuiButtonElement control={control} variant="contained" type="submit">
            Submit
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
