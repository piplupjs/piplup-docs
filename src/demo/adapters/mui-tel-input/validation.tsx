'use client';

import Stack from '@mui/material/Stack';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { MuiTelInputElement } from '@piplup/rhf-adapters/mui-tel-input';
import { matchIsValidTel } from 'mui-tel-input';
import { useForm } from 'react-hook-form';

import type { MuiTelInputCountry } from 'mui-tel-input';

const COUNTRIES: MuiTelInputCountry[] = ['GB', 'IE', 'US'];

export default function Page() {
  const { control, handleSubmit } = useForm({ defaultValues: { phone: '' } });

  return (
    <form onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))} noValidate>
      <Stack direction="column" spacing={2}>
        <MuiTelInputElement
          rules={{
            validate: (value) =>
              matchIsValidTel(value, { onlyCountries: COUNTRIES }) ||
              'Enter a valid UK, Irish or US number',
          }}
          control={control}
          defaultCountry="GB"
          label="Mobile number"
          messages={{ required: 'Enter a phone number' }}
          name="phone"
          onlyCountries={COUNTRIES}
          required
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
