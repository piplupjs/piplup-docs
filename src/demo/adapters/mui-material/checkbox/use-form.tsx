'use client';

import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import { MuiButtonElement, MuiCheckboxElement } from '@piplup/rhf-adapters/mui-material';
import { useForm } from 'react-hook-form';

export default function Page() {
  const { control, handleSubmit } = useForm({
    defaultValues: { terms: true },
  });

  return (
    <form onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))}>
      <Stack direction="column" spacing={2}>
        <FormControlLabel
          control={
            <MuiCheckboxElement
              transform={{
                input(value) {
                  // Checkbox expects value to be always array
                  return Array.isArray(value) ? value : [value];
                },
                output(event, checked) {
                  return checked;
                },
              }}
              control={control}
              name="terms"
            />
          }
          label="Accept terms & conditions"
          value={true}
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
