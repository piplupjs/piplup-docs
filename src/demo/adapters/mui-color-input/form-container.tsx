"use client";

import Stack from "@mui/material/Stack";
import { MuiColorInputElement } from "@piplup/rhf-adapters/mui-color-input";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { FormContainer } from "@piplup/rhf-core";

export default function Page() {
  return (
    <FormContainer
      defaultValues={{ accent: "#1976d2" }}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
    >
      <Stack direction="column" spacing={2}>
        <MuiColorInputElement name="accent" label="Accent color" />
        <div>
          <MuiButtonElement type="submit" variant="contained">
            Submit
          </MuiButtonElement>
        </div>
      </Stack>
    </FormContainer>
  );
}
