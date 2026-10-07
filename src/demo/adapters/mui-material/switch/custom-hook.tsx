"use client";

import type { ChangeEvent } from "react";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import {
  MuiButtonElement,
  useMuiSwitchAdapter,
} from "@piplup/rhf-adapters/mui-material";
import { type Control, useForm } from "react-hook-form";

type FormValues = {
  terms: boolean;
  newsletter: "subscribed" | "unsubscribed";
};

// A switch that must be on. `false` fails the `required` rule.
function TermsSwitch({ control }: { control: Control<FormValues> }) {
  const { helperText, error, ...adapter } = useMuiSwitchAdapter<
    boolean,
    FormValues,
    "terms"
  >({
    control,
    name: "terms",
    required: true,
    composeHelperText: true,
    messages: { required: "You need to accept the terms to continue" },
  });

  return (
    <div>
      <FormControlLabel
        control={<Switch {...adapter} />}
        label="I accept the terms of service"
      />
      {error && <FormHelperText error>{helperText}</FormHelperText>}
    </div>
  );
}

// A switch that stores a string instead of a boolean.
function NewsletterSwitch({ control }: { control: Control<FormValues> }) {
  const { helperText: _helperText, error: _error, ...adapter } =
    useMuiSwitchAdapter<boolean, FormValues, "newsletter">({
      control,
      name: "newsletter",
      transform: {
        input: (value) => value === "subscribed",
        output: (event: ChangeEvent<HTMLInputElement>) =>
          event.target.checked ? "subscribed" : "unsubscribed",
      },
    });

  return (
    <FormControlLabel
      control={<Switch {...adapter} />}
      label="Send me the monthly newsletter"
    />
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { terms: false, newsletter: "unsubscribed" },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) =>
        alert(JSON.stringify(values, null, 2)),
      )}
    >
      <Stack direction="column" spacing={1}>
        <TermsSwitch control={control} />
        <NewsletterSwitch control={control} />
        <div>
          <MuiButtonElement control={control} variant="contained" type="submit">
            Continue
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
