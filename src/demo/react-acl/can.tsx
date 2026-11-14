'use client';

import * as React from 'react';
import Alert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import { AccessControlProvider, Can } from '@piplup/react-acl';

const grantable = ['invoice:read', 'invoice:write', 'invoice:*'];

export default function Page() {
  const [permissions, setPermissions] = React.useState<string[]>(['invoice:read']);
  const [isAdmin, setIsAdmin] = React.useState(false);

  const principal = React.useMemo(
    () => ({ permissions, roles: isAdmin ? ['admin'] : ['member'] }),
    [permissions, isAdmin],
  );

  const toggle = (permission: string) =>
    setPermissions((current) =>
      current.includes(permission)
        ? current.filter((p) => p !== permission)
        : [...current, permission],
    );

  return (
    <Stack spacing={2}>
      <Stack direction="row" sx={{ flexWrap: 'wrap' }}>
        {grantable.map((permission) => (
          <FormControlLabel
            key={permission}
            label={permission}
            control={
              <Checkbox
                checked={permissions.includes(permission)}
                onChange={() => toggle(permission)}
              />
            }
          />
        ))}
        <FormControlLabel
          label="admin role"
          control={<Checkbox checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />}
        />
      </Stack>

      <AccessControlProvider principal={principal}>
        <Stack spacing={1}>
          {/* Default mode is ALL: every listed permission is required. */}
          <Can
            permission={['invoice:read', 'invoice:write']}
            fallback={<Alert severity="error">ALL: needs read and write</Alert>}
          >
            <Alert severity="success">ALL: can edit invoices</Alert>
          </Can>

          {/* ANY: one matching permission is enough. */}
          <Can
            mode="ANY"
            permission={['invoice:read', 'invoice:write']}
            fallback={<Alert severity="error">ANY: no invoice permission</Alert>}
          >
            <Alert severity="success">ANY: can open the invoices page</Alert>
          </Can>

          {/* Tick `invoice:*` on its own to see one wildcard satisfy a deeper name. */}
          <Can
            permission="invoice:line:edit"
            fallback={<Alert severity="error">invoice:line:edit: denied</Alert>}
          >
            <Alert severity="success">invoice:line:edit: granted by invoice:*</Alert>
          </Can>

          {/* Role and permission are checked separately and both must pass. */}
          <Can
            permission="invoice:write"
            role="admin"
            fallback={<Alert severity="error">admin + invoice:write: denied</Alert>}
          >
            <Alert severity="success">admin + invoice:write: can void invoices</Alert>
          </Can>
        </Stack>
      </AccessControlProvider>
    </Stack>
  );
}
