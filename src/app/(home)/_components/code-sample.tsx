import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';

const sample = `import { FormContainer } from '@piplup/rhf-core';
import { MuiTextFieldElement } from '@piplup/rhf-adapters/mui-material';
import { Can } from '@piplup/react-acl';

export function InvoiceForm() {
  return (
    <FormContainer onSuccess={save}>
      <MuiTextFieldElement
        name="reference"
        label="Reference"
        rules={{ required: 'Required' }}
      />

      {/* Rendered only if the user holds invoice:write — or invoice:* */}
      <Can permission="invoice:write">
        <Button type="submit">Save</Button>
      </Can>
    </FormContainer>
  );
}`;

export function CodeSample() {
  return (
    // `w-full`: the layout is a flex column, so `mx-auto` alone shrink-wraps the section to its
    // widest child. Here that is the longest code line, which pushes the page wider than a phone
    // instead of letting the code block scroll.
    <section className="mx-auto w-full max-w-3xl px-4 py-12">
      <h2 className="text-center text-2xl font-semibold tracking-tight">
        Wired up, not wrapped up
      </h2>
      <p className="mx-auto mt-2 mb-8 max-w-xl text-center text-fd-muted-foreground text-balance">
        Field binding and validation come from the adapter. The permission check resolves wildcards.
        Neither needs a <code className="font-mono text-sm">Controller</code> or a context lookup in
        your component.
      </p>

      <DynamicCodeBlock code={sample} lang="tsx" />
    </section>
  );
}
