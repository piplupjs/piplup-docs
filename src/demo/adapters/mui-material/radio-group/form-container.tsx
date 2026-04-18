"use client";

import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import {
  MuiButtonElement,
  MuiRadioGroupElement,
} from "@piplup/rhf-adapters/mui-material";
import { FormContainer } from "@piplup/rhf-core";

export default function Page() {
  return (
    <FormContainer
      defaultValues={{ role: "user", plan: "starter" }}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
    >
      <Stack direction="column" spacing={2}>
        <MuiRadioGroupElement name="plan">
          <FormControlLabel
            value="starter"
            control={<Radio />}
            label="Starter"
          />
          <FormControlLabel value="pro" control={<Radio />} label="Pro" />
        </MuiRadioGroupElement>
        <div>
          <MuiButtonElement type="submit" variant="contained">
            Submit
          </MuiButtonElement>
        </div>
      </Stack>
    </FormContainer>
  );
}
