"use client";

import Stack from "@mui/material/Stack";
import {
  MuiSliderElement,
  MuiButtonElement,
} from "@piplup/rhf-adapters/mui-material";
import { FormContainer } from "@piplup/rhf-core";

export default function Page() {
  return (
    <FormContainer
      defaultValues={{ rating: 3, volume: 30 }}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
    >
      <Stack direction="column" spacing={2}>
        <MuiSliderElement name="volume" />
        <div>
          <MuiButtonElement type="submit" variant="contained">
            Submit
          </MuiButtonElement>
        </div>
      </Stack>
    </FormContainer>
  );
}
