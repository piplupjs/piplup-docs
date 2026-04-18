"use client";

import { TextField } from "@mui/material";
import {
  MuiAutocompleteElement,
  MuiButtonElement,
} from "@piplup/rhf-adapters/mui-material";
import { useForm } from "react-hook-form";

export default function Page() {
  const { control, handleSubmit } = useForm<{ framework: string | null }>({
    defaultValues: { framework: "React" },
  });
  const options = ["React", "Vue", "Svelte"];

  return (
    <form
      onSubmit={handleSubmit((values) =>
        alert(JSON.stringify(values, null, 2)),
      )}
    >
      <MuiAutocompleteElement
        control={control}
        name="framework"
        options={options}
        renderInput={(params) => <TextField {...params} label="Framework" />}
      />
      <MuiButtonElement
        control={control}
        type="submit"
        variant="contained"
        sx={{ mt: 2 }}
      >
        Submit
      </MuiButtonElement>
    </form>
  );
}
