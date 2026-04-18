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
      defaultValues={{ text: "" }}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
    >
      <Stack direction="column" spacing={2}>
        <MuiTextFieldElement name="text" label="Text field" />
        <div>
          <MuiButtonElement variant="contained" type="submit">
            Submit
          </MuiButtonElement>
        </div>
      </Stack>
    </FormContainer>
  );
}
