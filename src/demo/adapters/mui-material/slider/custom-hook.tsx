'use client';

import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MuiButtonElement, useMuiSliderAdapter } from '@piplup/rhf-adapters/mui-material';
import { useForm } from 'react-hook-form';

import type { Control } from 'react-hook-form';

type PriceRange = { max: number; min: number };

type FormValues = { price: PriceRange };

const MIN_GAP = 100;

// A two-thumb slider that stores `{ min, max }` instead of the `[min, max]`
// array MUI works with, and requires a minimum gap between the thumbs.
function PriceRangeField({ control }: { control: Control<FormValues> }) {
  const { error, helperText, ...adapter } = useMuiSliderAdapter<
    number[],
    FormValues,
    'price',
    HTMLSpanElement
  >({
    composeHelperText: true,
    control,
    helperText: `At least $${MIN_GAP} apart`,
    max: 1000,
    min: 0,
    name: 'price',
    rules: {
      validate: ({ max, min }) =>
        max - min >= MIN_GAP || `Leave at least $${MIN_GAP} between the two prices`,
    },
    transform: {
      input: (value) => [value.min, value.max],
      output: (_event: Event, value: number[]) => ({
        max: value[1],
        min: value[0],
      }),
    },
  });

  return (
    <Box sx={{ width: 300 }}>
      <Typography id="price-label" gutterBottom>
        Price range
      </Typography>
      <Slider
        aria-labelledby="price-label"
        step={50}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `$${value}`}
        {...adapter}
      />
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </Box>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { price: { max: 600, min: 200 } },
  });

  return (
    <form onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))} noValidate>
      <Stack direction="column" spacing={2}>
        <PriceRangeField control={control} />
        <div>
          <MuiButtonElement control={control} type="submit" variant="contained">
            Filter
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
