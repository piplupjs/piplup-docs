"use client";

import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import {
  MuiButtonElement,
  useMuiSelectAdapter,
} from "@piplup/rhf-adapters/mui-material";
import { type Control, useForm } from "react-hook-form";

type FormValues = { languages: string[] };

const LANGUAGES = ["English", "French", "German", "Hindi", "Japanese", "Spanish"];

const MAX_LANGUAGES = 3;

// A multiple select with its label and helper text in one component.
// maxLength doesn't apply to arrays, so the limit is a `validate` rule.
function LanguagesField({ control }: { control: Control<FormValues> }) {
  const { error, helperText, ...adapter } = useMuiSelectAdapter<
    string[],
    FormValues,
    "languages",
    HTMLDivElement
  >({
    control,
    name: "languages",
    multiple: true,
    required: true,
    composeHelperText: true,
    helperText: `Up to ${MAX_LANGUAGES} languages`,
    messages: { required: "Pick at least one language" },
    rules: {
      validate: (value) =>
        value.length <= MAX_LANGUAGES ||
        `Pick ${MAX_LANGUAGES} languages or fewer`,
    },
  });

  return (
    <FormControl error={error} sx={{ width: 280 }}>
      <InputLabel id="languages-label">Languages you speak</InputLabel>
      <Select
        labelId="languages-label"
        label="Languages you speak"
        renderValue={(selected) => (selected as string[]).join(", ")}
        {...adapter}
      >
        {LANGUAGES.map((language) => (
          <MenuItem key={language} value={language}>
            {language}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { languages: [] },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) =>
        alert(JSON.stringify(values, null, 2)),
      )}
    >
      <Stack direction="column" spacing={2}>
        <LanguagesField control={control} />
        <div>
          <MuiButtonElement control={control} type="submit" variant="contained">
            Submit
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
