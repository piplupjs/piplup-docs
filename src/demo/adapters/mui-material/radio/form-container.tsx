"use client";

import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import {
  MuiRadioElement,
  MuiButtonElement,
} from "@piplup/rhf-adapters/mui-material";
import { FormContainer } from "@piplup/rhf-core";

export default function Page() {
  return (
    <FormContainer
      defaultValues={{ choice: "" }}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
    >
      <Stack direction="column" spacing={2}>
        <FormControlLabel
          control={
            <MuiRadioElement
              name="choice"
              value="a"
              checked={(value) => value === "a"}
            />
          }
          label="Choice A"
        />
        <FormControlLabel
          control={
            <MuiRadioElement
              name="choice"
              value="b"
              checked={(value) => value === "b"}
            />
          }
          label="Choice B"
        />
        <div>
          <MuiButtonElement type="submit" variant="contained">
            Submit
          </MuiButtonElement>
        </div>
      </Stack>
    </FormContainer>
  );
}
