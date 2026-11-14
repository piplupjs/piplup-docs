'use client';

import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// Types the CSS-variables theme, which is what exposes `colorSchemeNode` on ThemeProvider.
import type {} from '@mui/material/themeCssVarsAugmentation';

// fumadocs (next-themes) toggles a `light`/`dark` class on <html>,
// so MUI's CSS variables follow the same selector.
const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'class' },
  colorSchemes: { light: true, dark: true },
});

export function DemoPreview({ children }: { children: React.ReactNode }) {
  return (
    // next-themes owns the class on <html>. Left to its defaults, MUI resolves its own mode from
    // the OS (`system`) and rewrites that class whenever a demo mounts, flipping the site out of
    // the theme the toggle shows. With no node and no storage, MUI only emits the CSS variables,
    // and those already follow the class next-themes sets.
    <ThemeProvider theme={theme} colorSchemeNode={null} storageManager={null}>
      <div className="not-prose rounded-xl border bg-fd-background p-4">{children}</div>
    </ThemeProvider>
  );
}
