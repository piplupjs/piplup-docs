"use client";

import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import {
  MuiFabElement,
  MuiTextFieldElement,
} from "@piplup/rhf-adapters/mui-material";
import { useForm } from "react-hook-form";

export default function Page() {
  const { control, handleSubmit } = useForm({ defaultValues: { name: "" } });

  return (
    <form
      onSubmit={handleSubmit((values) =>
        alert(JSON.stringify(values, null, 2)),
      )}
    >
      <Stack spacing={2}>
        <MuiTextFieldElement control={control} name="name" label="Name" />
        <div>
          <MuiFabElement
            control={control}
            type="submit"
            color="secondary"
            size="small"
          >
            <AddIcon />
          </MuiFabElement>
        </div>
      </Stack>
    </form>
  );
}
