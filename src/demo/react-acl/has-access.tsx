"use client";

import * as React from "react";
import Alert from "@mui/material/Alert";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import { AclProvider, HasAccess } from "@piplup/react-acl";

const allPermissions = ["invoice:read", "invoice:write"];

export default function Page() {
  const [permissions, setPermissions] = React.useState<string[]>(["invoice:read"]);
  const [isAdmin, setIsAdmin] = React.useState(false);

  const roles = React.useMemo(() => (isAdmin ? ["admin"] : ["member"]), [isAdmin]);

  const toggle = (permission: string) =>
    setPermissions((current) =>
      current.includes(permission)
        ? current.filter((p) => p !== permission)
        : [...current, permission],
    );

  return (
    <Stack spacing={2}>
      <Stack direction="row" sx={{ flexWrap: "wrap" }}>
        {allPermissions.map((permission) => (
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

      <AclProvider loading={false} roles={roles} permissions={permissions}>
        <Stack spacing={1}>
          {/* Default mode is "any": one matching permission is enough. */}
          <HasAccess
            permissions={allPermissions}
            fallback={<Alert severity="error">any: no invoice permission</Alert>}
          >
            <Alert severity="success">any: can open the invoices page</Alert>
          </HasAccess>

          {/* "all": every listed permission is required. */}
          <HasAccess
            permissions={allPermissions}
            validationMode={{ permissions: "all" }}
            fallback={<Alert severity="error">all: needs read and write</Alert>}
          >
            <Alert severity="success">all: can edit invoices</Alert>
          </HasAccess>

          {/* Roles and permissions must both pass. */}
          <HasAccess
            roles={["admin"]}
            permissions={["invoice:write"]}
            fallback={<Alert severity="error">admin + invoice:write: denied</Alert>}
          >
            <Alert severity="success">admin + invoice:write: can void invoices</Alert>
          </HasAccess>
        </Stack>
      </AclProvider>
    </Stack>
  );
}
