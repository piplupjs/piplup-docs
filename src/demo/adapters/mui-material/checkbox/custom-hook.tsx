"use client";

import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import {
  MuiButtonElement,
  useMuiCheckboxAdapter,
} from "@piplup/rhf-adapters/mui-material";
import type * as React from "react";
import { type Control, useForm } from "react-hook-form";

type Channel = "email" | "sms" | "push";

type FormValues = { channels?: Channel[] };

const CHANNELS: Array<{ value: Channel; label: string }> = [
  { value: "email", label: "Email" },
  { value: "sms", label: "SMS" },
  { value: "push", label: "Push notifications" },
];

// Every checkbox registers the same field, so they share these rules.
const sharedProps = {
  name: "channels",
  required: true,
  messages: { required: "Pick at least one channel" },
} as const;

// One option. Checking it adds `value` to the array, unchecking removes it.
function ChannelCheckbox({
  control,
  value,
  label,
}: {
  control: Control<FormValues>;
  value: Channel;
  label: string;
}) {
  // Checkbox has no error or helperText props, so keep them off the DOM.
  // `required` is dropped too, or FormControlLabel would put an asterisk on
  // every option. The legend already shows one.
  const {
    error: _error,
    helperText: _helperText,
    required: _required,
    ...adapter
  } = useMuiCheckboxAdapter<unknown, FormValues, "channels", HTMLButtonElement>({
    control,
    value,
    ...sharedProps,
  });

  return <FormControlLabel control={<Checkbox {...adapter} />} label={label} />;
}

// A "select all" checkbox on the same field. `checked` and `indeterminate`
// read the whole array, and `transform.output` replaces it in one go.
function ChannelsField({ control }: { control: Control<FormValues> }) {
  const {
    error,
    helperText,
    required: _required,
    ...adapter
  } = useMuiCheckboxAdapter<
    unknown,
    FormValues,
    "channels",
    HTMLButtonElement
  >({
    control,
    value: "all",
    ...sharedProps,
    composeHelperText: true,
    checked: (value) =>
      Array.isArray(value) && value.length === CHANNELS.length,
    indeterminate: (value) =>
      Array.isArray(value) &&
      value.length > 0 &&
      value.length < CHANNELS.length,
    transform: {
      output: (event: React.ChangeEvent<HTMLInputElement>) =>
        event.target.checked
          ? CHANNELS.map((channel) => channel.value)
          : undefined,
    },
  });

  return (
    <FormControl
      required
      error={error}
      component="fieldset"
      variant="standard"
    >
      <FormLabel component="legend">Notify me by</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox {...adapter} />}
          label="All channels"
        />
        <Stack sx={{ pl: 3 }}>
          {CHANNELS.map((channel) => (
            <ChannelCheckbox
              key={channel.value}
              control={control}
              value={channel.value}
              label={channel.label}
            />
          ))}
        </Stack>
      </FormGroup>
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { channels: ["email"] },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) =>
        alert(JSON.stringify(values, null, 2)),
      )}
    >
      <Stack direction="column" spacing={2}>
        <ChannelsField control={control} />
        <div>
          <MuiButtonElement control={control} type="submit" variant="contained">
            Save preferences
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
