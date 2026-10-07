"use client";

import * as React from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AclProvider, HasAccess } from "@piplup/react-acl";

type Acl = { roles: string[]; permissions: string[] };

// Stands in for a request to your auth API.
const users: Record<string, Acl> = {
  guest: { roles: ["guest"], permissions: [] },
  viewer: { roles: ["viewer"], permissions: ["report:read"] },
  admin: { roles: ["admin"], permissions: ["report:read", "report:delete"] },
};

function fetchAcl(user: string): Promise<Acl> {
  return new Promise((resolve) => setTimeout(() => resolve(users[user]), 1200));
}

const emptyAcl: Acl = { roles: [], permissions: [] };

export default function Page() {
  const [user, setUser] = React.useState("guest");
  const [acl, setAcl] = React.useState<Acl>(emptyAcl);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let ignore = false;

    fetchAcl(user).then((result) => {
      if (!ignore) {
        setAcl(result);
        setLoading(false);
      }
    });

    return () => {
      ignore = true;
    };
  }, [user]);

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1}>
        {Object.keys(users).map((name) => (
          <Button
            key={name}
            variant={user === name ? "contained" : "outlined"}
            onClick={() => {
              if (name !== user) {
                setLoading(true);
                setUser(name);
              }
            }}
          >
            Sign in as {name}
          </Button>
        ))}
      </Stack>

      <AclProvider loading={loading} roles={acl.roles} permissions={acl.permissions}>
        <HasAccess
          permissions={["report:read"]}
          loading={<CircularProgress size={24} />}
          fallback={<Alert severity="warning">You can&apos;t view reports.</Alert>}
        >
          <Typography>Quarterly report: 1,204 orders.</Typography>
        </HasAccess>

        <HasAccess permissions={["report:delete"]} loading={null}>
          <div>
            <Button color="error" variant="outlined">
              Delete report
            </Button>
          </div>
        </HasAccess>
      </AclProvider>
    </Stack>
  );
}
