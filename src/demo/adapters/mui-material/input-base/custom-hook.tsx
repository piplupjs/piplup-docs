"use client";

import { useId } from "react";
import Stack from "@mui/material/Stack";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import {
  MuiButtonElement,
  useMuiInputBaseAdapter,
} from "@piplup/rhf-adapters/mui-material";
import { type Control, useForm } from "react-hook-form";

type FormValues = { seats: number | null };

// A borderless number field. The form stores a number (or null when empty),
// and the hook adds min/max rules with custom messages.
function SeatsField({ control }: { control: Control<FormValues> }) {
  const id = useId();
  const { ref, helperText, error, ...adapter } = useMuiInputBaseAdapter({
    control,
    name: "seats",
    type: "number",
    required: true,
    min: 1,
    max: 8,
    composeHelperText: true,
    helperText: "Between 1 and 8 seats per booking",
    messages: {
      required: "How many seats do you need?",
      min: "Book at least one seat",
      max: (max) => `Groups larger than ${max} need to call us`,
    },
    transform: {
      // An empty number field is stored as null. Give the input an empty
      // string instead so it stays controlled.
      input: (value) => value ?? "",
    },
  });

  return (
    <Stack spacing={0.5}>
      <Typography component="label" htmlFor={id} variant="body2">
        Seats
      </Typography>
      <InputBase
        {...adapter}
        id={id}
        error={error}
        inputRef={ref}
        slotProps={{ input: { min: 1, max: 8 } }}
        sx={{
          px: 1.5,
          py: 0.5,
          borderRadius: 1,
          bgcolor: "action.hover",
          maxWidth: 200,
          outline: error ? "2px solid" : "none",
          outlineColor: "error.main",
        }}
      />
      <Typography variant="caption" color={error ? "error" : "text.secondary"}>
        {helperText}
      </Typography>
    </Stack>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { seats: null },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) =>
        alert(JSON.stringify(values, null, 2)),
      )}
    >
      <Stack direction="column" spacing={2}>
        <SeatsField control={control} />
        <div>
          <MuiButtonElement control={control} variant="contained" type="submit">
            Book
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
