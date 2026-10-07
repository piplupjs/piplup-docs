"use client";

import dayjs, { type Dayjs } from "dayjs";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { LocalizationProvider, MonthCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { useMuiXMonthCalendarAdapter } from "@piplup/rhf-adapters/mui-x-date-pickers";
import { type Control, useForm } from "react-hook-form";

type FormValues = { billingStart: Dayjs | null };

// Compare by month, not by day. MonthCalendar stores the 1st of the month when
// nothing is selected yet, so `disablePast` would reject the current month.
function isPastMonth(month: Dayjs) {
  return month.isBefore(dayjs(), "month");
}

function BillingMonthField({ control }: { control: Control<FormValues> }) {
  // Remove the props MonthCalendar does not accept; it would pass them to its root <div>.
  const {
    error,
    helperText,
    required: _required,
    shouldDisableDate: _shouldDisableDate,
    shouldDisableYear: _shouldDisableYear,
    ...adapter
  } = useMuiXMonthCalendarAdapter<
    Dayjs,
    FormValues,
    "billingStart",
    HTMLDivElement
  >({
    control,
    name: "billingStart",
    required: true,
    composeHelperText: true,
    shouldDisableMonth: isPastMonth,
    messages: {
      required: "Choose the first month to bill",
      shouldDisableMonth: "Billing can't start in a past month",
    },
  });

  return (
    <div>
      <Typography variant="subtitle2" id="billing-start-label">
        First billing month ({dayjs().year()})
      </Typography>
      <MonthCalendar gridLabelId="billing-start-label" {...adapter} />
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </div>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { billingStart: null },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        noValidate
        onSubmit={handleSubmit((values) =>
          alert(values.billingStart?.startOf("month").format("YYYY-MM-DD")),
        )}
      >
        <Stack direction="column" spacing={2}>
          <BillingMonthField control={control} />
          <div>
            <MuiButtonElement control={control} variant="contained" type="submit">
              Start subscription
            </MuiButtonElement>
          </div>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
