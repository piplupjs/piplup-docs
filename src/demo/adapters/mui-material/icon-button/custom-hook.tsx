'use client';

import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { MuiTextFieldElement, useMuiIconButtonAdapter } from '@piplup/rhf-adapters/mui-material';
import { useForm } from 'react-hook-form';

import type { Control } from 'react-hook-form';

type FormValues = { query: string };

// Disabled while the form is invalid, e.g. when the query is too short.
function SearchButton({ control }: { control: Control<FormValues> }) {
  // IconButton has no error or helperText props, so keep them off the DOM.
  const { error, helperText, ...adapter } = useMuiIconButtonAdapter<FormValues, HTMLButtonElement>({
    control,
    disableOnError: true,
    type: 'submit',
  });

  return (
    <IconButton aria-label="Search" color="primary" {...adapter}>
      <SearchIcon />
    </IconButton>
  );
}

// type="reset" resets the form to its default values.
function ClearButton({ control }: { control: Control<FormValues> }) {
  const { error, helperText, ...adapter } = useMuiIconButtonAdapter<FormValues, HTMLButtonElement>({
    control,
    type: 'reset',
  });

  return (
    <IconButton aria-label="Clear search" {...adapter}>
      <ClearIcon />
    </IconButton>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { query: '' },
    mode: 'onChange',
  });

  return (
    <form onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))} noValidate>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'flex-start' }}>
        <MuiTextFieldElement
          control={control}
          label="Search products"
          messages={{ minLength: 'Type at least 3 characters' }}
          minLength={3}
          name="query"
          size="small"
        />
        <SearchButton control={control} />
        <ClearButton control={control} />
      </Stack>
    </form>
  );
}
