'use client';

import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import { MuiFabElement, MuiTextFieldElement } from '@piplup/rhf-adapters/mui-material';
import { FormContainer } from '@piplup/rhf-core';

export default function Page() {
  return (
    <FormContainer
      defaultValues={{ name: '' }}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
    >
      <Stack spacing={2}>
        <MuiTextFieldElement label="Name" name="name" />
        <div>
          <MuiFabElement color="secondary" size="small" type="submit">
            <AddIcon />
          </MuiFabElement>
        </div>
      </Stack>
    </FormContainer>
  );
}
