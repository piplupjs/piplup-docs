"use client";

import Stack from "@mui/material/Stack";
import { MuiColorInputElement } from "@piplup/rhf-adapters/mui-color-input";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { useForm } from "react-hook-form";

export default function Page() {
  const { control, handleSubmit } = useForm({
    defaultValues: { accent: "#1976d2" },
  });
  return (
    <form
      onSubmit={handleSubmit((values) =>
        alert(JSON.stringify(values, null, 2)),
      )}
    >
      <Stack direction="column" spacing={2}>
        <MuiColorInputElement
          control={control}
          name="accent"
          label="Accent color"
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
