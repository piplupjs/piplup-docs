"use client";

import Stack from "@mui/material/Stack";
import { MuiChipsInputElement, validateChipValues } from "@piplup/rhf-adapters/mui-chips-input";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { useForm } from "react-hook-form";

// One check, used twice: by the input (blocks new chips)
// and by the form (catches values that are already there).
const isEmail = (chip: string) =>
  /^\S+@\S+\.\S+$/.test(chip) || {
    isError: true,
    textError: `${chip} is not an email address`,
  };

export default function Page() {
  const { control, handleSubmit } = useForm({
    // "ben@example" never went through the input, so only the form rule sees it.
    defaultValues: { recipients: ["ana@example.com", "ben@example"] },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))}
    >
      <Stack direction="column" spacing={2}>
        <MuiChipsInputElement
          control={control}
          name="recipients"
          label="Recipients"
          helperText="Up to 3 email addresses"
          required
          messages={{ required: "Add at least one recipient" }}
          validate={isEmail}
          rules={{
            validate: {
              emails: validateChipValues(isEmail),
              count: (value) => value.length <= 3 || "You can add up to 3 recipients",
            },
          }}
        />
        <div>
          <MuiButtonElement control={control} variant="contained" type="submit">
            Send
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
