'use client';

import Stack from '@mui/material/Stack';
import { MuiColorInputElement } from '@piplup/rhf-adapters/mui-color-input';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { matchIsValidColor } from 'mui-color-input';
import { useForm } from 'react-hook-form';

export default function Page() {
  const { control, handleSubmit } = useForm({
    defaultValues: { background: '', border: '' },
  });

  return (
    <form onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))} noValidate>
      <Stack direction="column" spacing={2}>
        {/* Invalid text is stored as typed, so validate it. */}
        <MuiColorInputElement
          rules={{
            validate: (value) => matchIsValidColor(value) || 'Enter a valid color, e.g. #ff8800',
          }}
          control={control}
          format="hex"
          label="Background"
          messages={{ required: 'Pick a background color' }}
          name="background"
          required
        />
        {/* Invalid text is replaced with the fallback when the field loses focus. */}
        <MuiColorInputElement
          control={control}
          fallbackValue="#000000"
          format="rgb"
          helperText="Invalid colors reset to black on blur"
          label="Border"
          name="border"
        />
        <div>
          <MuiButtonElement control={control} type="submit" variant="contained">
            Submit
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
