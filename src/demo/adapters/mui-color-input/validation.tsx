"use client";

import Stack from "@mui/material/Stack";
import { MuiColorInputElement } from "@piplup/rhf-adapters/mui-color-input";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { matchIsValidColor } from "mui-color-input";
import { useForm } from "react-hook-form";

export default function Page() {
  const { control, handleSubmit } = useForm({
    defaultValues: { background: "", border: "" },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))}
    >
      <Stack direction="column" spacing={2}>
        {/* Invalid text is stored as typed, so validate it. */}
        <MuiColorInputElement
          control={control}
          name="background"
          label="Background"
          format="hex"
          required
          messages={{ required: "Pick a background color" }}
          rules={{
            validate: (value) => matchIsValidColor(value) || "Enter a valid color, e.g. #ff8800",
          }}
        />
        {/* Invalid text is replaced with the fallback when the field loses focus. */}
        <MuiColorInputElement
          control={control}
          name="border"
          label="Border"
          format="rgb"
          fallbackValue="#000000"
          helperText="Invalid colors reset to black on blur"
        />
        <div>
          <MuiButtonElement control={control} variant="contained" type="submit">
            Submit
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
