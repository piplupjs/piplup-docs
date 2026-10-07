"use client";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { useNumericFormatAdapter } from "@piplup/rhf-adapters/react-number-format";
import { type Control, useForm } from "react-hook-form";
import { NumericFormat, type NumberFormatValues } from "react-number-format";

type FormValues = { budget: number | null };

// Stores a real number (or null) instead of the default numeric string,
// and enforces a range with project-specific messages.
function BudgetField({ control }: { control: Control<FormValues> }) {
  const adapter = useNumericFormatAdapter<number | string, FormValues, "budget">({
    control,
    name: "budget",
    required: true,
    composeHelperText: true,
    min: 500,
    max: 50000,
    helperText: "Between $500 and $50,000",
    messages: {
      required: "Enter a budget",
      min: "The minimum budget is $500",
      max: "Budgets over $50,000 need approval",
    },
    transform: {
      input: (value) => value ?? "",
      output: (values: NumberFormatValues) => values.floatValue ?? null,
    },
  });

  return (
    <NumericFormat
      customInput={TextField}
      label="Project budget"
      prefix="$"
      thousandSeparator
      decimalScale={2}
      allowNegative={false}
      {...adapter}
    />
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { budget: null },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))}
    >
      <Stack direction="column" spacing={2}>
        <BudgetField control={control} />
        <div>
          <MuiButtonElement control={control} variant="contained" type="submit">
            Submit
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
