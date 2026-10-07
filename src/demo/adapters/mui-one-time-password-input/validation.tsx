"use client";

import Stack from "@mui/material/Stack";
import { MuiButtonElement, MuiFormHelperTextElement } from "@piplup/rhf-adapters/mui-material";
import { MuiOtpInputElement } from "@piplup/rhf-adapters/mui-one-time-password-input";
import { useForm } from "react-hook-form";

export default function Page() {
  const { control, handleSubmit } = useForm({ defaultValues: { code: "" } });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))}
    >
      <Stack direction="column" spacing={1}>
        <MuiOtpInputElement
          control={control}
          name="code"
          length={6}
          // Ignore anything that isn't a digit, including pasted text.
          validateChar={(character) => /^\d$/.test(character)}
          required
          // A partly filled code is not empty, so `required` alone lets it through.
          minLength={6}
          messages={{
            required: "Enter the code we sent you",
            minLength: "Enter all 6 digits",
          }}
        />
        {/* The OTP input has no helper text, so render the error message here. */}
        <MuiFormHelperTextElement control={control} name="code">
          We sent a 6-digit code to your email
        </MuiFormHelperTextElement>
        <div>
          <MuiButtonElement control={control} variant="contained" type="submit">
            Verify
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
