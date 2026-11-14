import * as React from 'react';

export type FaqItem = { answer: string; question: string };

/** Turns `code` spans in a plain-text answer into <code>, and leaves the rest as text. */
function renderInlineCode(text: string): React.ReactNode[] {
  return text
    .split(/(`[^`]+`)/g)
    .map((part, index) =>
      part.startsWith('`') && part.endsWith('`') ? (
        <code key={index}>{part.slice(1, -1)}</code>
      ) : (
        part
      ),
    );
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[`'"?]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * The visible half of a page's `faq` frontmatter; the docs page emits the FAQPage structured data
 * from the same list. Place it under a `## FAQ` heading so the table of contents links to it.
 */
export function Faq({ items }: { items?: readonly FaqItem[] }) {
  if (!items?.length) {
    return null;
  }

  return (
    <React.Fragment>
      {items.map(({ answer, question }) => (
        <section key={question}>
          <h3 id={`faq-${slugify(question)}`}>{renderInlineCode(question)}</h3>
          <p>{renderInlineCode(answer)}</p>
        </section>
      ))}
    </React.Fragment>
  );
}
