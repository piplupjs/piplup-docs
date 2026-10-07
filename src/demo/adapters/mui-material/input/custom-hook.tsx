"use client";

import { useState } from "react";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  MuiButtonElement,
  useMuiInputAdapterProps,
} from "@piplup/rhf-adapters/mui-material";
import { type Control, useForm } from "react-hook-form";

type FormValues = { email: string };

// The field does not set `required` or `disabled` itself. It picks both up
// from the surrounding FormControl, and type="email" adds an email check.
function EmailInput({ control }: { control: Control<FormValues> }) {
  const { ref, helperText, ...adapter } = useMuiInputAdapterProps({
    control,
    name: "email",
    type: "email",
    composeHelperText: true,
    messages: { required: "We need an email to send the receipt" },
  });

  // FormControl does not know about the field error, so pass it to the
  // label and helper text directly.
  return (
    <>
      <InputLabel error={adapter.error}>Email</InputLabel>
      <Input {...adapter} inputRef={ref} />
      <FormHelperText error={adapter.error}>{helperText}</FormHelperText>
    </>
  );
}

export default function Page() {
  const [sendReceipt, setSendReceipt] = useState(true);
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { email: "" },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) =>
        alert(JSON.stringify(values, null, 2)),
      )}
    >
      <Stack direction="column" spacing={2}>
        <FormControlLabel
          control={
            <Checkbox
              checked={sendReceipt}
              onChange={(event) => setSendReceipt(event.target.checked)}
            />
          }
          label="Email me a receipt"
        />
        <FormControl
          variant="standard"
          required={sendReceipt}
          disabled={!sendReceipt}
        >
          <EmailInput control={control} />
        </FormControl>
        <div>
          <MuiButtonElement control={control} variant="contained" type="submit">
            Pay
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
