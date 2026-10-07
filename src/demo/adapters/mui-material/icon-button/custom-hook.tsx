"use client";

import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import {
  MuiTextFieldElement,
  useMuiIconButtonAdapter,
} from "@piplup/rhf-adapters/mui-material";
import { type Control, useForm } from "react-hook-form";

type FormValues = { query: string };

// Disabled while the form is invalid, e.g. when the query is too short.
function SearchButton({ control }: { control: Control<FormValues> }) {
  // IconButton has no error or helperText props, so keep them off the DOM.
  const {
    error: _error,
    helperText: _helperText,
    ...adapter
  } = useMuiIconButtonAdapter<FormValues, HTMLButtonElement>({
    control,
    type: "submit",
    disableOnError: true,
  });

  return (
    <IconButton aria-label="Search" color="primary" {...adapter}>
      <SearchIcon />
    </IconButton>
  );
}

// type="reset" resets the form to its default values.
function ClearButton({ control }: { control: Control<FormValues> }) {
  const {
    error: _error,
    helperText: _helperText,
    ...adapter
  } = useMuiIconButtonAdapter<FormValues, HTMLButtonElement>({
    control,
    type: "reset",
  });

  return (
    <IconButton aria-label="Clear search" {...adapter}>
      <ClearIcon />
    </IconButton>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: { query: "" },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) =>
        alert(JSON.stringify(values, null, 2)),
      )}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: "flex-start" }}>
        <MuiTextFieldElement
          control={control}
          name="query"
          label="Search products"
          size="small"
          minLength={3}
          messages={{ minLength: "Type at least 3 characters" }}
        />
        <SearchButton control={control} />
        <ClearButton control={control} />
      </Stack>
    </form>
  );
}
