'use client';

import Stack from '@mui/material/Stack';
import { MuiChipsInputElement, validateChipValues } from '@piplup/rhf-adapters/mui-chips-input';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { useForm } from 'react-hook-form';

// One check, used twice: by the input (blocks new chips)
// and by the form (catches values that are already there).
const isEmail = (chip: string) =>
  /^\S+@\S+\.\S+$/.test(chip) || {
    isError: true,
    textError: `${chip} is not an email address`,
  };

export default function Page() {
  const { control, handleSubmit } = useForm({
    // "ben@example" never went through the input, so only the form rule sees it.
    defaultValues: { recipients: ['ana@example.com', 'ben@example'] },
  });

  return (
    <form onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))} noValidate>
      <Stack direction="column" spacing={2}>
        <MuiChipsInputElement
          rules={{
            validate: {
              count: (value) => value.length <= 3 || 'You can add up to 3 recipients',
              emails: validateChipValues(isEmail),
            },
          }}
          control={control}
          helperText="Up to 3 email addresses"
          label="Recipients"
          messages={{ required: 'Add at least one recipient' }}
          name="recipients"
          validate={isEmail}
          required
        />
        <div>
          <MuiButtonElement control={control} type="submit" variant="contained">
            Send
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
