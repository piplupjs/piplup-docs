"use client";

import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import {
  MuiButtonElement,
  useMuiAutocompleteAdapter,
} from "@piplup/rhf-adapters/mui-material";
import type * as React from "react";
import { type Control, useForm } from "react-hook-form";

type Country = { code: string; label: string };

type FormValues = { country: string | null };

const COUNTRIES: Country[] = [
  { code: "CA", label: "Canada" },
  { code: "DE", label: "Germany" },
  { code: "IN", label: "India" },
  { code: "JP", label: "Japan" },
  { code: "GB", label: "United Kingdom" },
  { code: "US", label: "United States" },
];

// The form stores only the country code. The transform maps the code to an
// option object for the Autocomplete and back to a code on change.
function CountryField({ control }: { control: Control<FormValues> }) {
  const adapter = useMuiAutocompleteAdapter<
    Country | null,
    false,
    FormValues,
    "country",
    HTMLDivElement
  >({
    control,
    name: "country",
    required: true,
    composeHelperText: true,
    helperText: "Where should we ship your order?",
    messages: { required: "Choose a country" },
    transform: {
      input: (code) =>
        COUNTRIES.find((country) => country.code === code) ?? null,
      output: (_event: React.SyntheticEvent, option: Country | null) =>
        option?.code ?? null,
    },
    // params includes error, helperText and required from the adapter.
    renderInput: (params) => <TextField {...params} label="Country" />,
  });

  return (
    <Autocomplete
      options={COUNTRIES}
      getOptionLabel={(option) => option.label}
      sx={{ width: 300 }}
      {...adapter}
    />
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { country: "IN" },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) =>
        alert(JSON.stringify(values, null, 2)),
      )}
    >
      <Stack direction="column" spacing={2}>
        <CountryField control={control} />
        <div>
          <MuiButtonElement control={control} type="submit" variant="contained">
            Continue
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
