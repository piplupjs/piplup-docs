"use client";

import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import {
  MuiButtonElement,
  MuiRadioGroupElement,
} from "@piplup/rhf-adapters/mui-material";
import { useForm } from "react-hook-form";

export default function Page() {
  const { control, handleSubmit } = useForm({
    defaultValues: { role: "user", plan: "starter" },
  });

  return (
    <form
      onSubmit={handleSubmit((values) =>
        alert(JSON.stringify(values, null, 2)),
      )}
    >
      <Stack direction="column" spacing={2}>
        <MuiRadioGroupElement control={control} name="plan">
          <FormControlLabel
            value="starter"
            control={<Radio />}
            label="Starter"
          />
          <FormControlLabel value="pro" control={<Radio />} label="Pro" />
        </MuiRadioGroupElement>
        <div>
          <MuiButtonElement control={control} type="submit" variant="contained">
            Submit
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
