"use client";

import Stack from "@mui/material/Stack";
import {
  MuiOutlinedInputElement,
  MuiButtonElement,
} from "@piplup/rhf-adapters/mui-material";
import { FormContainer } from "@piplup/rhf-core";

export default function Page() {
  return (
    <FormContainer
      defaultValues={{ text: "" }}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
    >
      <Stack spacing={2}>
        <MuiOutlinedInputElement name="text" />
        <div>
          <MuiButtonElement type="submit" variant="contained">
            Submit
          </MuiButtonElement>
        </div>
      </Stack>
    </FormContainer>
  );
}
