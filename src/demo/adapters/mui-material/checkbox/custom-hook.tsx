'use client';

import type * as React from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import { MuiButtonElement, useMuiCheckboxAdapter } from '@piplup/rhf-adapters/mui-material';
import { useForm } from 'react-hook-form';

import type { Control } from 'react-hook-form';

type Channel = 'email' | 'push' | 'sms';

type FormValues = { channels?: Channel[] };

const CHANNELS: Array<{ label: string; value: Channel }> = [
  { label: 'Email', value: 'email' },
  { label: 'SMS', value: 'sms' },
  { label: 'Push notifications', value: 'push' },
];

// Every checkbox registers the same field, so they share these rules.
const sharedProps = {
  messages: { required: 'Pick at least one channel' },
  name: 'channels',
  required: true,
} as const;

// One option. Checking it adds `value` to the array, unchecking removes it.
function ChannelCheckbox({
  control,
  label,
  value,
}: {
  control: Control<FormValues>;
  label: string;
  value: Channel;
}) {
  // Checkbox has no error or helperText props, so keep them off the DOM.
  // `required` is dropped too, or FormControlLabel would put an asterisk on
  // every option. The legend already shows one.
  const { error, helperText, required, ...adapter } = useMuiCheckboxAdapter<
    unknown,
    FormValues,
    'channels',
    HTMLButtonElement
  >({
    control,
    value,
    ...sharedProps,
  });

  return <FormControlLabel control={<Checkbox {...adapter} />} label={label} />;
}

// A "select all" checkbox on the same field. `checked` and `indeterminate`
// read the whole array, and `transform.output` replaces it in one go.
function ChannelsField({ control }: { control: Control<FormValues> }) {
  const { error, helperText, required, ...adapter } = useMuiCheckboxAdapter<
    unknown,
    FormValues,
    'channels',
    HTMLButtonElement
  >({
    control,
    value: 'all',
    ...sharedProps,
    checked: (value) => Array.isArray(value) && value.length === CHANNELS.length,
    composeHelperText: true,
    indeterminate: (value) =>
      Array.isArray(value) && value.length > 0 && value.length < CHANNELS.length,
    transform: {
      output: (event: React.ChangeEvent<HTMLInputElement>) =>
        event.target.checked ? CHANNELS.map((channel) => channel.value) : undefined,
    },
  });

  return (
    <FormControl component="fieldset" error={error} variant="standard" required>
      <FormLabel component="legend">Notify me by</FormLabel>
      <FormGroup>
        <FormControlLabel control={<Checkbox {...adapter} />} label="All channels" />
        <Stack sx={{ pl: 3 }}>
          {CHANNELS.map((channel) => (
            <ChannelCheckbox
              control={control}
              key={channel.value}
              label={channel.label}
              value={channel.value}
            />
          ))}
        </Stack>
      </FormGroup>
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { channels: ['email'] },
  });

  return (
    <form onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))} noValidate>
      <Stack direction="column" spacing={2}>
        <ChannelsField control={control} />
        <div>
          <MuiButtonElement control={control} type="submit" variant="contained">
            Save preferences
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
