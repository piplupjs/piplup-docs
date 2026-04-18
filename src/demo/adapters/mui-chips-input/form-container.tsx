"use client";

import Stack from "@mui/material/Stack";
import { MuiChipsInputElement } from "@piplup/rhf-adapters/mui-chips-input";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { FormContainer } from "@piplup/rhf-core";

export default function Page() {
  return (
    <FormContainer
      defaultValues={{ tags: ["react"] }}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
    >
      <Stack direction="column" spacing={2}>
        <MuiChipsInputElement name="tags" label="Tags" />
        <div>
          <MuiButtonElement variant="contained" type="submit">
            Submit
          </MuiButtonElement>
        </div>
      </Stack>
    </FormContainer>
  );
}
