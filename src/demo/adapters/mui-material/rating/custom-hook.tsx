"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  MuiButtonElement,
  useMuiRatingAdapter,
} from "@piplup/rhf-adapters/mui-material";
import { type Control, useForm } from "react-hook-form";

type FormValues = { score: number | null };

const LABELS: Record<number, string> = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very good",
  5: "Excellent",
};

// A required rating with a word next to the stars. Click the selected star
// again to clear it; the field becomes `null` and the required rule fails.
function ScoreField({ control }: { control: Control<FormValues> }) {
  const [hover, setHover] = React.useState(-1);

  const { error, helperText, ...adapter } = useMuiRatingAdapter<
    number | null,
    FormValues,
    "score",
    HTMLSpanElement
  >({
    control,
    name: "score",
    required: true,
    composeHelperText: true,
    messages: { required: "Please rate your stay" },
  });

  const shown = hover !== -1 ? hover : adapter.value;

  return (
    <Stack spacing={0.5}>
      <Typography component="legend">How was your stay?</Typography>
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Rating
          {...adapter}
          onChangeActive={(_event, value) => setHover(value)}
        />
        <Box sx={{ minWidth: 80 }}>{shown ? LABELS[shown] : null}</Box>
      </Stack>
      {helperText ? (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      ) : null}
    </Stack>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { score: null },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) =>
        alert(JSON.stringify(values, null, 2)),
      )}
    >
      <Stack direction="column" spacing={2}>
        <ScoreField control={control} />
        <div>
          <MuiButtonElement control={control} type="submit" variant="contained">
            Send review
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
