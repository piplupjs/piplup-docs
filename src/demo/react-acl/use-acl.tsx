"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { AclProvider, useAcl } from "@piplup/react-acl";

const roleOptions = {
  guest: { roles: ["guest"], permissions: [] },
  editor: { roles: ["editor"], permissions: ["post:create", "post:publish"] },
  owner: { roles: ["owner"], permissions: ["post:create", "post:publish", "post:delete"] },
};

type Role = keyof typeof roleOptions;

const actions = [
  { label: "New post", permissions: "post:create" },
  { label: "Publish", permissions: "post:publish" },
  { label: "Delete", permissions: "post:delete" },
];

function PostToolbar() {
  const { isAuthorized, loading } = useAcl();

  // A single value works as well as an array.
  const visible = actions.filter((action) => isAuthorized({ permissions: action.permissions }));

  // Check a role in an event handler, not only while rendering.
  const handleExport = () => {
    alert(isAuthorized({ roles: ["editor", "owner"] }) ? "Exporting posts" : "Sign in to export");
  };

  if (loading) {
    return <Typography>Checking access...</Typography>;
  }

  return (
    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
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
  const [role, setRole] = React.useState<Role>("editor");
  const { roles, permissions } = roleOptions[role];

  return (
    <Stack spacing={2}>
      <TextField
        select
        size="small"
        label="Current user"
        value={role}
        onChange={(e) => setRole(e.target.value as Role)}
        sx={{ maxWidth: 200 }}
      >
        {Object.keys(roleOptions).map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </TextField>

      <AclProvider loading={false} roles={roles} permissions={permissions}>
        <PostToolbar />
      </AclProvider>
    </Stack>
  );
}
