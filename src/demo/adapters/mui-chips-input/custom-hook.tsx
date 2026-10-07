"use client";

import Stack from "@mui/material/Stack";
import { useMuiChipsInputAdapter } from "@piplup/rhf-adapters/mui-chips-input";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { MuiChipsInput } from "mui-chips-input";
import { type Control, useForm } from "react-hook-form";

// The API expects keywords as one comma-separated string, not an array.
type FormValues = { keywords: string };

function KeywordsField({ control }: { control: Control<FormValues> }) {
  const adapter = useMuiChipsInputAdapter<string[], FormValues, "keywords", HTMLDivElement>({
    control,
    name: "keywords",
    required: true,
    composeHelperText: true,
    helperText: "Press Enter after each keyword",
    messages: { required: "Add at least one keyword" },
    transform: {
      // "react,forms" -> ["react", "forms"] for the chips
      input: (value) => (value ? value.split(",") : []),
      // chips -> lowercase, de-duplicated, comma-separated string
      output: (chips: string[]) =>
        Array.from(new Set(chips.map((chip) => chip.toLowerCase()))).join(","),
    },
  });

  return (
    <MuiChipsInput
      label="Keywords"
      validate={(chip) => ({
        isError: chip.includes(","),
        textError: "Keywords can't contain commas",
      })}
      {...adapter}
    />
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { keywords: "react,forms" },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))}
    >
      <Stack direction="column" spacing={2}>
        <KeywordsField control={control} />
        <div>
          <MuiButtonElement control={control} variant="contained" type="submit">
            Save
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
