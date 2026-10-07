"use client";

import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  MuiButtonElement,
  useMuiSliderAdapter,
} from "@piplup/rhf-adapters/mui-material";
import { type Control, useForm } from "react-hook-form";

type PriceRange = { min: number; max: number };

type FormValues = { price: PriceRange };

const MIN_GAP = 100;

// A two-thumb slider that stores `{ min, max }` instead of the `[min, max]`
// array MUI works with, and requires a minimum gap between the thumbs.
function PriceRangeField({ control }: { control: Control<FormValues> }) {
  const { error, helperText, ...adapter } = useMuiSliderAdapter<
    number[],
    FormValues,
    "price",
    HTMLSpanElement
  >({
    control,
    name: "price",
    min: 0,
    max: 1000,
    composeHelperText: true,
    helperText: `At least $${MIN_GAP} apart`,
    rules: {
      validate: ({ min, max }) =>
        max - min >= MIN_GAP ||
        `Leave at least $${MIN_GAP} between the two prices`,
    },
    transform: {
      input: (value) => [value.min, value.max],
      output: (_event: Event, value: number[]) => ({
        min: value[0],
        max: value[1],
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
    defaultValues: { price: { min: 200, max: 600 } },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) =>
        alert(JSON.stringify(values, null, 2)),
      )}
    >
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
