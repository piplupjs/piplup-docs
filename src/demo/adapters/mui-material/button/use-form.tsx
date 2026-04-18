"use client";

import Stack from "@mui/material/Stack";
import {
  MuiButtonElement,
  MuiTextFieldElement,
} from "@piplup/rhf-adapters/mui-material";
import { useForm } from "react-hook-form";

export default function Page() {
  const { control, handleSubmit } = useForm({ defaultValues: { name: "" } });

  return (
    <form
      onSubmit={handleSubmit((values) =>
        alert(JSON.stringify(values, null, 2)),
      )}
      noValidate
    >
      <Stack spacing={2}>
        <MuiTextFieldElement control={control} name="name" label="Name" />
        <div>
          <MuiButtonElement control={control} type="submit" variant="contained">
            Save
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
