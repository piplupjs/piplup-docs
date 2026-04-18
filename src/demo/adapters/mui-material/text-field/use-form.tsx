"use client";

import Stack from "@mui/material/Stack";
import {
  MuiButtonElement,
  MuiTextFieldElement,
} from "@piplup/rhf-adapters/mui-material";
import { useForm } from "react-hook-form";

export default function Page() {
  const { control, handleSubmit } = useForm({
    defaultValues: { text: "" },
  });

  return (
    <form
      onSubmit={handleSubmit((values) =>
        alert(JSON.stringify(values, null, 2)),
      )}
    >
      <Stack direction="column" spacing={2}>
        <MuiTextFieldElement control={control} name="text" label="Text field" />
        <div>
          <MuiButtonElement control={control} variant="contained" type="submit">
            Submit
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
