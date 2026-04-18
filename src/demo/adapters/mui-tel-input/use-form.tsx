"use client";

import Stack from "@mui/material/Stack";
import { MuiTelInputElement } from "@piplup/rhf-adapters/mui-tel-input";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { useForm } from "react-hook-form";

export default function Page() {
  const { control, handleSubmit } = useForm({
    defaultValues: { phone: "+1 555 123 4567" },
  });
  return (
    <form
      onSubmit={handleSubmit((values) =>
        alert(JSON.stringify(values, null, 2)),
      )}
    >
      <Stack direction="column" spacing={2}>
        <MuiTelInputElement
          control={control}
          name="phone"
          label="Phone number"
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
