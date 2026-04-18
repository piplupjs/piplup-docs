"use client";

import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import {
  MuiRadioElement,
  MuiButtonElement,
} from "@piplup/rhf-adapters/mui-material";
import { useForm } from "react-hook-form";

export default function Page() {
  const { control, handleSubmit } = useForm({
    defaultValues: { choice: "" },
  });

  return (
    <form
      onSubmit={handleSubmit((values) =>
        alert(JSON.stringify(values, null, 2)),
      )}
    >
      <Stack direction="column" spacing={2}>
        <FormControlLabel
          control={
            <MuiRadioElement
              name="choice"
              value="a"
              checked={(value) => value === "a"}
              control={control}
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
              control={control}
            />
          }
          label="Choice B"
        />
        <div>
          <MuiButtonElement control={control} type="submit" variant="contained">
            Submit
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
