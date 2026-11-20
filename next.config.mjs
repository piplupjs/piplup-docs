import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

const pickersRoute = '/docs/rhf-adapters/mui-x-date-pickers';

/**
 * The desktop, mobile and static versions of each MUI X picker used to have an element page and a
 * hook page each. They now live in a "Desktop, mobile and static versions" section of the main
 * picker's pages, so their old URLs point there.
 */
const pickerVariantRedirects = ['date', 'time', 'date-time'].flatMap((kind) =>
  ['desktop', 'mobile', 'static'].flatMap((variant) => [
    {
      destination: `${pickersRoute}/components/mui-x-${kind}-picker-element`,
      permanent: true,
      source: `${pickersRoute}/components/mui-x-${variant}-${kind}-picker-element`,
    },
    {
      destination: `${pickersRoute}/hooks/use-mui-x-${kind}-picker-adapter`,
      permanent: true,
      source: `${pickersRoute}/hooks/use-mui-x-${variant}-${kind}-picker-adapter`,
    },
  ]),
);

/**
 * Each adapter's hook used to have a page of its own next to its element's page. Where one of the
 * two was thin, they are now one page at the element's URL, with the hook in a section of its own.
 * Pairs of `[hook page, element page]` under `/docs/rhf-adapters`.
 */
const mergedHookPages = [
  ['html/hooks/use-html-button-adapter', 'html/components/html-button-element'],
  ['html/hooks/use-html-form-helper-text-adapter', 'html/components/html-form-helper-text-element'],
  ['html/hooks/use-html-form-label-adapter', 'html/components/html-form-label-element'],
  ['html/hooks/use-html-input-adapter', 'html/components/html-input-element'],
  ['html/hooks/use-html-textarea-adapter', 'html/components/html-textarea-element'],
  [
    'mui-file-input/hooks/use-mui-file-input-adapter',
    'mui-file-input/components/mui-file-input-element',
  ],
  ['mui-material/hooks/use-mui-button-adapter', 'mui-material/components/mui-button-element'],
  ['mui-material/hooks/use-mui-fab-adapter', 'mui-material/components/mui-fab-element'],
  [
    'mui-material/hooks/use-mui-filled-input-adapter',
    'mui-material/components/mui-filled-input-element',
  ],
  [
    'mui-material/hooks/use-mui-form-helper-text-adapter',
    'mui-material/components/mui-form-helper-text-element',
  ],
  [
    'mui-material/hooks/use-mui-form-label-adapter',
    'mui-material/components/mui-form-label-element',
  ],
  [
    'mui-material/hooks/use-mui-icon-button-adapter',
    'mui-material/components/mui-icon-button-element',
  ],
  [
    'mui-material/hooks/use-mui-input-base-adapter',
    'mui-material/components/mui-input-base-element',
  ],
  [
    'mui-material/hooks/use-mui-input-label-adapter',
    'mui-material/components/mui-input-label-element',
  ],
  [
    'mui-material/hooks/use-mui-outlined-input-adapter',
    'mui-material/components/mui-outlined-input-element',
  ],
  ['mui-material/hooks/use-mui-radio-adapter', 'mui-material/components/mui-radio-element'],
  [
    'mui-material/hooks/use-mui-radio-group-adapter',
    'mui-material/components/mui-radio-group-element',
  ],
  ['mui-material/hooks/use-mui-rating-adapter', 'mui-material/components/mui-rating-element'],
  ['mui-material/hooks/use-mui-slider-adapter', 'mui-material/components/mui-slider-element'],
  ['mui-material/hooks/use-mui-switch-adapter', 'mui-material/components/mui-switch-element'],
  [
    'mui-one-time-password-input/hooks/use-mui-otp-input-adapter',
    'mui-one-time-password-input/components/mui-otp-input-element',
  ],
  [
    'mui-tel-input/hooks/use-mui-tel-input-adapter',
    'mui-tel-input/components/mui-tel-input-element',
  ],
  [
    'mui-x-date-pickers/hooks/use-mui-x-date-calendar-adapter',
    'mui-x-date-pickers/components/mui-x-date-calendar-element',
  ],
  [
    'mui-x-date-pickers/hooks/use-mui-x-date-field-adapter',
    'mui-x-date-pickers/components/mui-x-date-field-element',
  ],
  [
    'mui-x-date-pickers/hooks/use-mui-x-digital-clock-adapter',
    'mui-x-date-pickers/components/mui-x-digital-clock-element',
  ],
  [
    'mui-x-date-pickers/hooks/use-mui-x-month-calendar-adapter',
    'mui-x-date-pickers/components/mui-x-month-calendar-element',
  ],
  [
    'mui-x-date-pickers/hooks/use-mui-x-multi-section-digital-clock-adapter',
    'mui-x-date-pickers/components/mui-x-multi-section-digital-clock-element',
  ],
  [
    'mui-x-date-pickers/hooks/use-mui-x-time-clock-adapter',
    'mui-x-date-pickers/components/mui-x-time-clock-element',
  ],
  [
    'mui-x-date-pickers/hooks/use-mui-x-time-field-adapter',
    'mui-x-date-pickers/components/mui-x-time-field-element',
  ],
  [
    'mui-x-date-pickers/hooks/use-mui-x-year-calendar-adapter',
    'mui-x-date-pickers/components/mui-x-year-calendar-element',
  ],
  [
    'react-number-format/hooks/use-number-format-base-adapter',
    'react-number-format/components/number-format-base-element',
  ],
  [
    'react-number-format/hooks/use-numeric-format-adapter',
    'react-number-format/components/numeric-format-element',
  ],
  [
    'react-number-format/hooks/use-pattern-format-adapter',
    'react-number-format/components/pattern-format-element',
  ],
].map(([hook, element]) => ({
  destination: `/docs/rhf-adapters/${element}`,
  permanent: true,
  source: `/docs/rhf-adapters/${hook}`,
}));

/** @type {import('next').NextConfig} */
const config = {
  // `/docs/<page>.mdx` is rewritten to the page's markdown in `src/proxy.ts`.
  async headers() {
    return [
      {
        headers: [{ key: 'Vary', value: 'Accept' }],
        // Docs URLs answer with HTML or markdown depending on `Accept` (see `src/proxy.ts`), so the
        // markdown answer must tell caches to key on it, or one could hand it to a browser. Next
        // replaces this on prerendered HTML with its own `Vary`, which is harmless: a cached HTML
        // copy served to an agent is still a valid answer.
        source: '/docs/:path*',
      },
    ];
  },
  reactStrictMode: true,
  async redirects() {
    return [
      // @piplup/react-acl 4.0 renamed these. The old paths were linked from the
      // 3.x docs and README, so keep them resolving.
      {
        destination: '/docs/react-acl/components/access-control-provider',
        permanent: true,
        source: '/docs/react-acl/components/acl-provider',
      },
      {
        destination: '/docs/react-acl/components/can',
        permanent: true,
        source: '/docs/react-acl/components/has-access',
      },
      {
        destination: '/docs/react-acl/hooks/use-access-control',
        permanent: true,
        source: '/docs/react-acl/hooks/use-acl',
      },
      // A URL from the previous site that Google still crawls and reports as a 404.
      {
        destination: '/docs/rhf-adapters/installation',
        permanent: true,
        source: '/react-number-format',
      },
      // Each rhf-adapters subpath used to have its own short installation page. They are now
      // sections of one page, and the npm READMEs still link to the old URLs.
      {
        destination: '/docs/rhf-adapters/installation',
        permanent: true,
        source: '/docs/rhf-adapters/:subpath/installation',
      },
      ...pickerVariantRedirects,
      ...mergedHookPages,
    ];
  },
};

export default withMDX(config);
