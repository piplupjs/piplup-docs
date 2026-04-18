"use client";

import Stack from "@mui/material/Stack";
import { PatternFormatElement } from "@piplup/rhf-adapters/react-number-format";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { useForm } from "react-hook-form";

export default function Page() {
  const { control, handleSubmit } = useForm({
    defaultValues: { card: "4242424242424242" },
  });
  return (
    <form
      onSubmit={handleSubmit((values) =>
        alert(JSON.stringify(values, null, 2)),
      )}
    >
      <Stack direction="column" spacing={2}>
        <PatternFormatElement
          control={control}
          name="card"
          format="#### #### #### ####"
          mask="_"
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
