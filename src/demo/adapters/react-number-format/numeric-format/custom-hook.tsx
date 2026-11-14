'use client';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { useNumericFormatAdapter } from '@piplup/rhf-adapters/react-number-format';
import { useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

import type { Control } from 'react-hook-form';
import type { NumberFormatValues } from 'react-number-format';

type FormValues = { budget: null | number };

// Stores a real number (or null) instead of the default numeric string,
// and enforces a range with project-specific messages.
function BudgetField({ control }: { control: Control<FormValues> }) {
  const adapter = useNumericFormatAdapter<number | string, FormValues, 'budget'>({
    composeHelperText: true,
    control,
    helperText: 'Between $500 and $50,000',
    max: 50000,
    messages: {
      max: 'Budgets over $50,000 need approval',
      min: 'The minimum budget is $500',
      required: 'Enter a budget',
    },
    min: 500,
    name: 'budget',
    required: true,
    transform: {
      input: (value) => value ?? '',
      output: (values: NumberFormatValues) => values.floatValue ?? null,
    },
  });

  return (
    <NumericFormat
      allowNegative={false}
      customInput={TextField}
      decimalScale={2}
      label="Project budget"
      prefix="$"
      thousandSeparator
      {...adapter}
    />
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { budget: null },
  });

  return (
    <form onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))} noValidate>
      <Stack direction="column" spacing={2}>
        <BudgetField control={control} />
        <div>
          <MuiButtonElement control={control} type="submit" variant="contained">
            Submit
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
