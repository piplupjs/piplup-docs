'use client';

import Stack from '@mui/material/Stack';
import { useMuiChipsInputAdapter } from '@piplup/rhf-adapters/mui-chips-input';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { MuiChipsInput } from 'mui-chips-input';
import { useForm } from 'react-hook-form';

import type { Control } from 'react-hook-form';

// The API expects keywords as one comma-separated string, not an array.
type FormValues = { keywords: string };

function KeywordsField({ control }: { control: Control<FormValues> }) {
  const adapter = useMuiChipsInputAdapter<string[], FormValues, 'keywords', HTMLDivElement>({
    composeHelperText: true,
    control,
    helperText: 'Press Enter after each keyword',
    messages: { required: 'Add at least one keyword' },
    name: 'keywords',
    required: true,
    transform: {
      // "react,forms" -> ["react", "forms"] for the chips
      input: (value) => (value ? value.split(',') : []),
      // chips -> lowercase, de-duplicated, comma-separated string
      output: (chips: string[]) =>
        Array.from(new Set(chips.map((chip) => chip.toLowerCase()))).join(','),
    },
  });

  return (
    <MuiChipsInput
      validate={(chip) => ({
        isError: chip.includes(','),
        textError: "Keywords can't contain commas",
      })}
      label="Keywords"
      {...adapter}
    />
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { keywords: 'react,forms' },
  });

  return (
    <form onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))} noValidate>
      <Stack direction="column" spacing={2}>
        <KeywordsField control={control} />
        <div>
          <MuiButtonElement control={control} type="submit" variant="contained">
            Save
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
