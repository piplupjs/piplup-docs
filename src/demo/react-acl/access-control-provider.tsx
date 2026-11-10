"use client";

import * as React from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AccessControlProvider, Can, type AccessPrincipal } from "@piplup/react-acl";

// Stands in for a request to your auth API.
const users: Record<string, AccessPrincipal> = {
  guest: { roles: ["guest"], permissions: [] },
  viewer: { roles: ["viewer"], permissions: ["report:read"] },
  admin: { roles: ["admin"], permissions: ["report:*"] },
};

function fetchPrincipal(user: string): Promise<AccessPrincipal> {
  return new Promise((resolve) => setTimeout(() => resolve(users[user]), 1200));
}

type Loaded = { user: string; principal: AccessPrincipal };

export default function Page() {
  const [user, setUser] = React.useState("guest");
  const [loaded, setLoaded] = React.useState<Loaded | null>(null);

  React.useEffect(() => {
    let ignore = false;

    fetchPrincipal(user).then((principal) => {
      if (!ignore) {
        setLoaded({ user, principal });
      }
    });

    return () => {
      ignore = true;
    };
  }, [user]);

  // A principal loaded for a different user is stale, so it counts as not loaded
  // yet. `undefined` is exactly what the provider reads as "still loading", so no
  // separate loading flag is needed.
  const principal = loaded?.user === user ? loaded.principal : undefined;

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
        {Object.keys(users).map((name) => (
          <Button
            key={name}
            variant={user === name ? "contained" : "outlined"}
            onClick={() => setUser(name)}
          >
            Sign in as {name}
          </Button>
        ))}
      </Stack>

      <AccessControlProvider principal={principal}>
        <Can
          permission="report:read"
          loading={<CircularProgress size={24} />}
          fallback={<Alert severity="warning">You can&apos;t view reports.</Alert>}
        >
          <Typography>Quarterly report: 1,204 orders.</Typography>
        </Can>

        {/* admin holds `report:*`, which grants every report permission. */}
        <Can permission="report:delete">
          <div>
            <Button color="error" variant="outlined">
              Delete report
            </Button>
          </div>
        </Can>
      </AccessControlProvider>
    </Stack>
  );
}
