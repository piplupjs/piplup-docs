'use client';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { MuiFileInputElement } from '@piplup/rhf-adapters/mui-file-input';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { useForm } from 'react-hook-form';

const MAX_SIZE = 1024 * 1024; // 1 MB

type FormValues = { photos: File[] };

export default function Page() {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { photos: [] },
  });

  return (
    <form
      onSubmit={handleSubmit((values) =>
        // File objects serialize to {} with JSON.stringify, so list them by hand.
        alert(
          values.photos
            .map((file) => `${file.name} (${Math.round(file.size / 1024)} KB)`)
            .join('\n'),
        ),
      )}
      noValidate
    >
      <Stack direction="column" spacing={2}>
        <MuiFileInputElement
          rules={{
            validate: {
              count: (files) => files.length <= 3 || 'Attach up to 3 photos',
              size: (files) =>
                files.every((file) => file.size <= MAX_SIZE) ||
                'Each photo must be 1 MB or smaller',
              type: (files) =>
                files.every((file) => file.type.startsWith('image/')) ||
                'Only image files are allowed',
            },
          }}
          control={control}
          label="Photos"
          messages={{ required: 'Attach at least one photo' }}
          name="photos"
          placeholder="Choose up to 3 images"
          // `accept` only filters the browser's file picker. The rules below enforce it.
          slotProps={{ htmlInput: { accept: 'image/*' } }}
          multiple
          required
        />
        <Stack direction="row" spacing={1}>
          <MuiButtonElement control={control} type="submit" variant="contained">
            Upload
          </MuiButtonElement>
          <Button onClick={() => reset()} variant="outlined">
            Reset
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
