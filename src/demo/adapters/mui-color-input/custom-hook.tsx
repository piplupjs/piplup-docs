'use client';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useMuiColorInputAdapter } from '@piplup/rhf-adapters/mui-color-input';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { MuiColorInput, matchIsValidColor } from 'mui-color-input';
import { useForm, useWatch } from 'react-hook-form';

import type { Control } from 'react-hook-form';

type FormValues = { buttonColor: string };

// Perceived brightness of a "#rrggbb" color, from 0 (black) to 255 (white).
function brightness(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return (r * 299 + g * 587 + b * 114) / 1000;
}

// A color field for button backgrounds: hex only, no alpha,
// and it rejects colors too light for white button text.
function ButtonColorField({ control }: { control: Control<FormValues> }) {
  const adapter = useMuiColorInputAdapter<string, FormValues, 'buttonColor', HTMLDivElement>({
    composeHelperText: true,
    control,
    helperText: 'Used behind white button text',
    messages: { required: 'Pick a button color' },
    name: 'buttonColor',
    required: true,
    rules: {
      validate: {
        contrast: (value) => brightness(value) < 128 || 'Too light for white text',
        valid: (value) => matchIsValidColor(value) || 'Enter a valid hex color',
      },
    },
  });

  return <MuiColorInput format="hex" label="Button color" isAlphaHidden {...adapter} />;
}

function Preview({ control }: { control: Control<FormValues> }) {
  const color = useWatch({ control, name: 'buttonColor' });
  const background = matchIsValidColor(color) ? color : undefined;

  return (
    <Button sx={{ alignSelf: 'flex-start', bgcolor: background }} variant="contained">
      Preview
    </Button>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { buttonColor: '#1976d2' },
  });

  return (
    <form onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))} noValidate>
      <Stack direction="column" spacing={2}>
        <ButtonColorField control={control} />
        <Preview control={control} />
        <div>
          <MuiButtonElement control={control} type="submit" variant="contained">
            Save theme
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
