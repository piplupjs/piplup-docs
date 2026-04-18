"use client";

import { TextField } from "@mui/material";
import {
  MuiAutocompleteElement,
  MuiButtonElement,
} from "@piplup/rhf-adapters/mui-material";
import { FormContainer } from "@piplup/rhf-core";

export default function Page() {
  const options = ["React", "Vue", "Svelte"];

  return (
    <FormContainer
      defaultValues={{ framework: "React" }}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
    >
      <MuiAutocompleteElement
        name="framework"
        options={options}
        renderInput={(params) => <TextField {...params} label="Framework" />}
      />
      <MuiButtonElement type="submit" variant="contained" sx={{ mt: 2 }}>
        Submit
      </MuiButtonElement>
    </FormContainer>
  );
}
