'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AccessControlProvider, useAccessControl, type AccessPrincipal } from '@piplup/react-acl';

const principals: Record<string, AccessPrincipal> = {
  guest: { roles: ['guest'], permissions: [] },
  editor: { roles: ['editor'], permissions: ['post:create', 'post:publish'] },
  owner: { roles: ['owner'], permissions: ['post:*'] },
};

type User = keyof typeof principals;

const actions = [
  { label: 'New post', permission: 'post:create' },
  { label: 'Publish', permission: 'post:publish' },
  { label: 'Delete', permission: 'post:delete' },
];

function PostToolbar() {
  const { can, hasRole, loading } = useAccessControl();

  // `can` is bound to the principal, so no need to pass it around.
  const visible = actions.filter((action) => can(action.permission));

  // Check a role in an event handler, not only while rendering.
  const handleExport = () => {
    alert(hasRole(['editor', 'owner']) ? 'Exporting posts' : 'Sign in to export');
  };

  if (loading) {
    return <Typography>Checking access...</Typography>;
  }

  return (
    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
      {visible.map((action) => (
        <Button key={action.label} variant="contained">
          {action.label}
        </Button>
      ))}
      <Button variant="outlined" onClick={handleExport}>
        Export
      </Button>
    </Stack>
  );
}

export default function Page() {
  const [user, setUser] = React.useState<User>('editor');

  return (
    <Stack spacing={2}>
      <TextField
        select
        size="small"
        label="Current user"
        value={user}
        onChange={(e) => setUser(e.target.value as User)}
        sx={{ maxWidth: 200 }}
      >
        {Object.keys(principals).map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </TextField>

      {/* owner holds `post:*`, so every action shows without listing each one. */}
      <AccessControlProvider principal={principals[user]}>
        <PostToolbar />
      </AccessControlProvider>
    </Stack>
  );
}
