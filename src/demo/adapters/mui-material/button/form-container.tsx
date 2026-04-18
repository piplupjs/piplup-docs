"use client";

import Stack from "@mui/material/Stack";
import {
  MuiButtonElement,
  MuiTextFieldElement,
} from "@piplup/rhf-adapters/mui-material";
import { FormContainer } from "@piplup/rhf-core";

export default function Page() {
  return (
    <FormContainer
      defaultValues={{ name: "" }}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
    >
      <Stack spacing={2}>
        <MuiTextFieldElement name="name" label="Name" />
        <div>
          <MuiButtonElement type="submit" variant="contained">
            Save
          </MuiButtonElement>
        </div>
      </Stack>
    </FormContainer>
  );
}
