"use client";

import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import {
  MuiSwitchElement,
  MuiButtonElement,
} from "@piplup/rhf-adapters/mui-material";
import { FormContainer } from "@piplup/rhf-core";

export default function Page() {
  return (
    <FormContainer
      defaultValues={{ newsletter: false }}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
    >
      <Stack direction="column" spacing={2}>
        <FormControlLabel
          control={<MuiSwitchElement name="newsletter" />}
          label="Newsletter"
        />
        <div>
          <MuiButtonElement variant="contained" type="submit">
            Submit
          </MuiButtonElement>
        </div>
      </Stack>
    </FormContainer>
  );
}
